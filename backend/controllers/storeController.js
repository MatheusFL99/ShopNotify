const Store = require('../models/store')
const bcrypt = require('bcryptjs')
const createStoreToken = require('../helpers/create-store-token')
const getToken = require('../helpers/get-token')
const getStoreByToken = require('../helpers/get-store-by-token')
const jwt = require('jsonwebtoken')

module.exports = class storeController {
  ////////////// CADASTRO ///////////////
  static async register(req, res) {
    const { name, email, cnpj, password, confirmpassword } = req.body

    // validações
    if (!name) {
      res.status(422).json({ message: 'Nome é obrigatório!' })
      return
    }
    if (!email) {
      res.status(422).json({ message: 'Email é obrigatório!' })
      return
    }
    if (!cnpj) {
      res.status(422).json({ message: 'CNPJ é obrigatório!' })
      return
    }
    if (!password) {
      res.status(422).json({ message: 'Senha é obrigatória!' })
      return
    }
    if (!confirmpassword) {
      res.status(422).json({ message: 'Confirmação de senha é obrigatória!' })
      return
    }
    if (confirmpassword !== password) {
      res
        .status(422)
        .json({ message: 'A senha e a confirmação precisam ser iguais!' })
      return
    }

    // checa se a loja já existe
    const storeEmailExists = await Store.findOne({ email: email })
    if (storeEmailExists) {
      res.status(422).json({ message: 'Esse email já está sendo utilizado!' })
      return
    }
    const storeCnpjExists = await Store.findOne({ cnpj: cnpj })
    if (storeCnpjExists) {
      res.status(422).json({ message: 'Esse CNPJ já está sendo utilizado!' })
      return
    }

    // criar senha criptografada
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    // criar registro da loja
    const store = new Store({
      name,
      email,
      cnpj,
      password: passwordHash
    })

    try {
      const newStore = await store.save()

      await createStoreToken(newStore, req, res)
    } catch (err) {
      res.status(500).json({ message: err })
    }
  }

  ////////////// LOGIN ///////////////
  static async login(req, res) {
    const { email, password } = req.body

    if (!email) {
      res.status(422).json({ message: 'Email é obrigatório!' })
      return
    }

    if (!password) {
      res.status(422).json({ message: 'Senha é obrigatória!' })
      return
    }

    const store = await Store.findOne({ email: email })
    if (!store) {
      res.status(422).json({ message: 'Email ou senha inválidos' })
      return
    }

    // checa se a senha é igual a senha cadastrada
    const checkPassword = await bcrypt.compare(password, store.password)

    if (!checkPassword) {
      res.status(422).json({ message: 'Email ou senha inválidos' })
      return
    }

    await createStoreToken(store, req, res)
  }

  ////////////// LOGOUT ///////////////
  static async logout(req, res) {
    const token = getToken(req)

    if (!token) {
      res.status(422).json({ message: 'Token inválido!' })
      return
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_STORE)

    if (!decoded) {
      res.status(422).json({ message: 'Token inválido!' })
      return
    }

    const store = await Store.findById(decoded.id)

    if (!store) {
      res.status(422).json({ message: 'Token inválido!' })
      return
    }

    store.tokens = store.tokens.filter(t => t.token !== token)

    await store.save()

    res.status(200).json({ message: 'Logout realizado com sucesso!' })
  }

  ////////////// CHECAR LOJA PELO TOKEN ///////////////
  static async checkStore(req, res) {
    let currentStore

    if (req.headers.authorization) {
      const token = getToken(req)
      const decoded = jwt.verify(token, process.env.JWT_SECRET_STORE)
      currentStore = await Store.findById(decoded.id)
      currentStore.password = undefined
    } else {
      currentStore = null
    }

    res.status(200).send(currentStore)
  }

  /////////////// GET LOJA PELO ID ///////////////
  static async getStoreById(req, res) {
    const { id } = req.params.id
    const store = await Store.findById(id).select('-password')

    if (!store) {
      res.status(422).json({ message: 'Loja não encontrada!' })
      return
    }

    res.status(200).json(store)
  }

  /////////////// GET LOJAS ///////////////
  static async getStores(req, res) {
    const stores = await Store.find().select('-password')
    res.status(200).json(stores)
  }

  //////////////// EDITAR PERFIL DA LOJA ///////////////////
  static async editProfile(req, res) {
    const storeId = req.params.id
    const { name, email, password, confirmpassword } = req.body

    const store = await Store.findById(storeId)

    // validações
    if (!name) {
      res.status(422).json({ message: 'O nome é obrigatório!' })
      return
    }

    store.name = name

    if (!email) {
      res.status(422).json({ message: 'O e-mail é obrigatório!' })
      return
    }

    const storeExists = await Store.findOne({ email: email })

    if (store.email !== email && storeExists) {
      res.status(422).json({ message: 'Esse email já está sendo utilizado.' })
      return
    }

    store.email = email

    if (password != confirmpassword) {
      res
        .status(422)
        .json({ error: 'Senha e confirmação de senha precisam ser iguais' })
      return
    } else if (password == confirmpassword && password != null) {
      const salt = await bcrypt.genSalt(12)
      const reqPassword = req.body.password

      const passwordHash = await bcrypt.hash(reqPassword, salt)

      store.password = passwordHash
    }

    try {
      const updatedStore = await Store.findOneAndUpdate(
        { _id: store._id },
        { $set: store },
        { new: true }
      )
      res.json({
        message: 'Usuário atualizado com sucesso!',
        data: updatedStore
      })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }

  ////////////// ATUALIZAR LOCALIZAÇÃO DA LOJA ///////////////
  static async updateLocation(req, res) {
    const token = getToken(req)
    const store = getStoreByToken(token)
    const { longitude, latitude } = req.body
    try {
      const updatedStore = await Store.findByIdAndUpdate(
        { _id: store._id },
        {
          location: {
            type: 'Point',
            coordinates: [longitude, latitude]
          }
        },
        { new: true }
      )
      res.status(200).json(updatedStore)
    } catch (err) {
      res.status(500).json({ message: err })
      return
    }
  }
}
