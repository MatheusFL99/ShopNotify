const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const User = require('../models/user')
const PaymentMethod = require('../models/paymentmethod')

module.exports = class paymentController {
  //////// ADICIONAR MÉTODO DE PAGAMENTO //////////
  static async addPaymentMethod(req, res) {
    const token = getToken(req)
    const user = await getUserByToken(token)
    const { paymentName, cardNumber, cvv, expirationDate, titularName } =
      req.body

    // validações
    if (!user) {
      res.status(422).json({ message: 'Usuário não encontrado!' })
      return
    }
    if (!req.body.paymentName) {
      res.status(422).json({ message: 'Nome do cartão é obrigatório!' })
      return
    }
    if (!req.body.cardNumber) {
      res.status(422).json({ message: 'Número do cartão é obrigatório!' })
      return
    }
    if (!req.body.cvv) {
      res
        .status(422)
        .json({ message: 'Código de segurança do cartão é obrigatório!' })
      return
    }
    if (!req.body.expirationDate) {
      res.status(422).json({ message: 'Data de expiração é obrigatório!' })
      return
    }

    // verifica se a data de validade do cartão é válida
    const expirationDateArray = expirationDate.split('/')
    const expirationMonth = expirationDateArray[0]
    const expirationYear = expirationDateArray[1]
    const today = new Date()
    const currentMonth = today.getMonth() + 1
    const currentYear = today.getFullYear()
    if (expirationYear < currentYear) {
      res.status(422).json({ message: 'Cartão expirado!' })
      return
    }
    if (expirationYear == currentYear && expirationMonth < currentMonth) {
      res.status(422).json({ message: 'Cartão expirado!' })
      return
    }

    if (!req.body.titularName) {
      res.status(422).json({ message: 'Nome do titular é obrigatório!' })
      return
    }

    //salvar método de pagamento no banco de dados
    const paymentMethod = new PaymentMethod({
      paymentName: paymentName,
      cardNumber: cardNumber,
      cvv: cvv,
      expirationDate: expirationDate,
      titularName: titularName,
      user: {
        _id: user.id,
        name: user.name
      }
    })

    try {
      const newPaymentMethod = await paymentMethod.save()
      const userUpdated = await User.findByIdAndUpdate(
        { _id: user._id },
        {
          $push: { paymentMethods: newPaymentMethod._id },
          new: true
        }
      )
      res.status(200).json({ message: newPaymentMethod })
    } catch (err) {
      res.status(500).json({ message: err })
      return
    }
  }

  //////// REMOVER MÉTODO DE PAGAMENTO //////////
  static async removePaymentMethod(req, res) {
    const token = getToken(req)
    const user = await getUserByToken(token)
    const paymentMethodId = req.params.id

    // validações
    if (!user) {
      res.status(422).json({ message: 'Usuário não encontrado!' })
      return
    }
    if (!paymentMethodId) {
      res.status(422).json({ message: 'Método de pagamento não encontrado!' })
      return
    }

    try {
      const paymentMethodRemoved = await PaymentMethod.findByIdAndRemove(
        paymentMethodId
      )
      res
        .status(200)
        .json({
          message: 'Método de pagamento removido!',
          paymentMethodRemoved
        })
    } catch (err) {
      res.status(500).json({ message: err })
      return
    }
  }

  //////// RECEBER MÉTODOS DE PAGAMENTO DO USUÁRIO //////////
  static async getUserPaymentMethods(req, res) {
    const token = getToken(req)
    const user = await getUserByToken(token)

    // validações
    if (!user) {
      res.status(422).json({ message: 'Usuário não encontrado!' })
      return
    }

    try {
      const userPaymentMethods = await PaymentMethod.find({ user: user.id })
      res.status(200).json(userPaymentMethods)
    } catch (err) {
      res.status(500).json({ message: err })
      return
    }
  }
}
