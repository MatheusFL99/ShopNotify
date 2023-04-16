const Coupon = require('../models/coupon')
const bcrypt = require('bcryptjs')
const getStoreByToken = require('../helpers/get-store-by-token')
const getUserByToken = require('../helpers/get-user-by-token')
const getToken = require('../helpers/get-token')

module.exports = class CouponController {
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

  /////////////// RESGATAR CUPOM ///////////////
  static async redeemCoupon(req, res) {
    const { hash } = req.body
    const coupon = await Coupon.findOne({ hash })

    // VALIDAÇÕES
    if (!hash) {
      res.status(422).json({ message: 'Hash é obrigatório!' })
      return
    }

    // Pegar token do usuário
    const token = getToken(req)
    const user = await getUserByToken(token)

    // Verificar se o cupom existe

    if (!coupon) {
      res.status(422).json({ message: 'Cupom não encontrado!' })
      return
    }

    // Verificar se o cupom já foi resgatado
    if (coupon.redeemed) {
      res.status(422).json({ message: 'Cupom já foi resgatado!' })
      return
    }

    // Verificar se o cupom já expirou
    if (coupon.expires < Date.now()) {
      res.status(422).json({ message: 'Cupom expirou!' })
      return
    }

    // Atualizar o cupom para resgatado
    coupon.reedemed = true
    coupon.reedemBy = {
      id: user._id,
      name: user.name
    }
    try {
      const updatedCoupon = await coupon.save()
      res
        .status(200)
        .json({ message: 'Cupom resgatado com sucesso!', updatedCoupon })
    } catch (err) {
      res.status(500).json({ message: err })
    }
  }
}
