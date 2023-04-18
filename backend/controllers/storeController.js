const Store = require('../models/store')
const Coupon = require('../models/coupon')
const bcrypt = require('bcryptjs')
const createStoreToken = require('../helpers/create-store-token')
const getStoreByToken = require('../helpers/get-store-by-token')
const getToken = require('../helpers/get-token')
const jwt = require('jsonwebtoken')

module.exports = class storeController {
  ////////////// CADASTRO ///////////////
  static async register(req, res) {
    const { name, email, password, confirmpassword } = req.body

    // validações
    if (!name) {
      res.status(422).json({ message: 'Nome é obrigatório!' })
      return
    }
    if (!email) {
      res.status(422).json({ message: 'Email é obrigatório!' })
      return
    }
    if (!password) {
      res.status(422).json({ message: 'Senha é obrigatória!' })
      return
    }
    if (!confirmpassword) {
      res.status(422).json({ message: 'Coonfirmação de senha é obrigatória!' })
      return
    }
    if (confirmpassword !== password) {
      res
        .status(422)
        .json({ message: 'A senha e a confirmação precisam ser iguais!' })
      return
    }

    // checa se a loja já existe
    const storeExists = await Store.findOne({ email: email })
    if (storeExists) {
      res.status(422).json({ message: 'Esse email já está sendo utilizado!' })
      return
    }

    // criar senha criptografada
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    // criar registro da loja
    const store = new Store({
      name,
      email,
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

  ////////////// CRIAR CUPOM ///////////////
  static async createCoupon(req, res) {
    const { porcentage, expDate, qnt } = req.body

    // Validações
    if (!porcentage) {
      res.status(422).json({ message: 'Porcentagem é obrigatório!' })
      return
    }
    if (!expDate) {
      res.status(422).json({ message: 'Data de expiração é obrigatório!' })
      return
    }
    if (!qnt) {
      res.status(422).json({ message: 'Quantidade é obrigatório!' })
      return
    }

    // Pegar o token da loja
    const token = getToken(req)
    const store = await getStoreByToken(token)

    // Gerar o hash do cupom
    const hash = await bcrypt.hash(
      `${porcentage}-${expDate}-${qnt}-${Date.now()}`,
      10
    )

    // Salvar o cupom no banco de dados
    const coupon = new Coupon({
      porcentage,
      expDate,
      qnt,
      hash,
      store: {
        id: store._id,
        name: store.name
      }
    })
    try {
      const newCoupon = await coupon.save()
      res.status(200).json({ message: 'Coupon criado com sucesso!', newCoupon })
    } catch (err) {
      res.status(500).json({ message: err })
    }

    res.json({ hash })
  }
}
