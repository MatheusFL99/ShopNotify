const Coupon = require('../models/coupon')
const ObjectId = require('mongoose').Types.ObjectId.isValid
const bcrypt = require('bcryptjs')
const getStoreByToken = require('../helpers/get-store-by-token')
const getUserByToken = require('../helpers/get-user-by-token')
const getToken = require('../helpers/get-token')

module.exports = class CouponController {
  ////////////// CRIAR CUPOM //////////////
  static async createCoupon(req, res) {
    const { discount, expirationDate, availableQuantity } = req.body

    // Validações
    if (!discount) {
      res
        .status(422)
        .json({ message: 'Porcentagem de desconto é obrigatório!' })
      return
    }
    if (!expirationDate) {
      res.status(422).json({ message: 'Data de expiração é obrigatório!' })
      return
    }
    if (!availableQuantity) {
      res.status(422).json({ message: 'Quantidade é obrigatório!' })
      return
    }
    if (discount > 100) {
      res.status(422).json({
        message: 'Porcentagem de desconto não pode ser maior que 100!'
      })
      return
    }
    if (expirationDate < Date.now()) {
      res.status(422).json({ message: 'Data de expiração inválida!' })
      return
    }
    if (availableQuantity < 1) {
      res.status(422).json({ message: 'Quantidade inválida!' })
      return
    }

    // Pegar o token da loja
    const token = getToken(req)
    const store = await getStoreByToken(token)

    // Gerar o hash do cupom
    const hash = await bcrypt.hash(
      `${discount}-${expirationDate}-${availableQuantity}-${Date.now()}`,
      10
    )

    // Salvar o cupom no banco de dados
    const coupon = new Coupon({
      hash,
      discount,
      expirationDate,
      availableQuantity,
      store: {
        _id: store.id,
        name: store.name
      }
    })
    try {
      const newCoupon = await coupon.save()
      res.status(200).json({ message: 'Coupon criado com sucesso!', newCoupon })
      return
    } catch (err) {
      res.status(500).json({ message: err })
      return
    }
  }

  ////////////// LISTAR CUPONS //////////////
  static async listCoupons(req, res) {
    const coupons = await Coupon.find({})

    res.send(coupons)
  }

  ////////////// GET CUPOM PELO ID //////////////
  static async getCouponById(req, res) {
    const id = req.params.id

    // verificar se o ID é válido
    if (!ObjectId(id)) {
      res.status(422).json({ message: 'ID inválido!' })
      return
    }

    // verificar se o cupom existe
    const coupon = await Coupon.findById({ _id: id })
    if (!coupon) {
      res.status(422).json({ message: 'Cupom não encontrado!' })
      return
    }

    res.status(200).json({ coupon })
  }

  ////////////// GET CUPOM PELA SOTRE //////////////
  static async getCouponsByStore(req, res) {
    const storeId = req.params.storeId

    // verificar se o ID é válido
    if (!ObjectId(storeId)) {
      res.status(422).json({ message: 'ID inválido!' })
      return
    }

    // verificar se o cupom existe
    const coupon = await Coupon.findById({ _id: id })
    if (!coupon) {
      res.status(422).json({ message: 'Cupom não encontrado!' })
      return
    }

    // verificar se o cupom pertence a loja
    if (coupon.store._id !== storeId) {
      res.status(422).json({ message: 'Cupom não encontrado!' })
      return
    }

    // retornar todos os cupons da loja
    const coupons = await Coupon.find({ store: { _id: storeId } })
    res.status(200).json({ coupons })
  }

  ////////////// RESGATAR CUPOM //////////////
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

    // Verificar se ainda tem cupons disponíveis
    if (coupon.availableQuantity < 1) {
      res.status(422).json({ message: 'Cupom indisponível!' })
      return
    }

    // Verificar se o cupom já foi resgatado pelo usuário
    if (coupon.users.includes(user._id)) {
      res.status(422).json({ message: 'Cupom já resgatado!' })
      return
    }

    // Verificar se o cupom já expirou
    if (coupon.expirationDate < Date.now()) {
      res.status(422).json({ message: 'Cupom expirado!' })
      return
    }

    // Atualizar cupom com o resgate
    coupon.availableQuantity--
    coupon.users.push(user._id)
    coupon.reedemDate.push(Date.now())
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
