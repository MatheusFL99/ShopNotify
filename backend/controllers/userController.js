const User = require('../models/user')
const bcrypt = require('bcryptjs')
const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const jwt = require('jsonwebtoken')

module.exports = class UserController {
  /////////////// CADASTRO ///////////////
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

    // checa se o usuario ja existe
    const userExists = await User.findOne({ email: email })
    if (userExists) {
      res.status(422).json({ message: 'Esse email já está sendo utilizado!' })
      return
    }

    // criar senha criptografada
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    // criar usuário
    const user = new User({
      name,
      email,
      password: passwordHash
    })

    try {
      const newUser = await user.save()

      await createUserToken(newUser, req, res)
    } catch (err) {
      res.status(500).json({ message: err })
    }
  }

  /////////////// LOGIN ///////////////
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

    const user = await User.findOne({ email: email })
    if (!user) {
      res.status(422).json({ message: 'Email ou senha inválidos' })
      return
    }

    // checa se a senha é igual a senha cadastrada
    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword) {
      res.status(422).json({ message: 'Email ou senha inválidos' })
      return
    }

    await createUserToken(user, req, res)
  }

  /////////////// LOGOUT ///////////////
  static async logout(req, res) {
    res.cookie('token', '', { maxAge: 0 })
    res.status(200).json({ message: 'Logout realizado com sucesso!' })
  }

  /////////////// CHECAR USUÁRIO PELO TOKEN JWS ///////////////
  static async checkUser(req, res) {
    let currentUser

    if (req.headers.authorization) {
      const token = getToken(req)
      const decoded = jwt.verify(token, process.env.JWT_SECRET_USER)
      currentUser = await User.findById(decoded.id)
      currentUser.password = undefined
    } else {
      currentUser = null
    }

    res.status(200).send(currentUser)
  }

  //////////////// EDITAR PERFIL ///////////////////
  static async editProfile(req, res) {
    const userId = req.params.id
    const { name, email, password, confirmpassword } = req.body

    const user = await User.findById(userId)

    // validações
    if (!name) {
      res.status(422).json({ message: 'O nome é obrigatório!' })
      return
    }

    user.name = name

    if (!email) {
      res.status(422).json({ message: 'O e-mail é obrigatório!' })
      return
    }

    const userExists = await User.findOne({ email: email })

    if (user.email !== email && userExists) {
      res.status(422).json({ message: 'Esse email já está sendo utilizado.' })
      return
    }

    user.email = email

    if (password != confirmpassword) {
      res
        .status(422)
        .json({ error: 'Senha e confirmação de senha precisam ser iguais' })
      return
    } else if (password == confirmpassword && password != null) {
      const salt = await bcrypt.genSalt(12)
      const reqPassword = req.body.password

      const passwordHash = await bcrypt.hash(reqPassword, salt)

      user.password = passwordHash
    }

    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $set: user },
        { new: true }
      )
      res.json({
        message: 'Usuário atualizado com sucesso!',
        data: updatedUser
      })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }

  /////////////// GET DE USUÁRIO PELO ID ///////////////
  static async getUserById(req, res) {
    const id = req.params.id

    const user = await User.findById(id).select('-password')

    if (!user) {
      res.status(422).json({ message: 'Usuário não encontrado!' })
      return
    }

    res.status(200).json({ user })
  }
}
