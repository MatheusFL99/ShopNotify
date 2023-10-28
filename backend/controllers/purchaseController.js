const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const Product = require('../models/product')
const User = require('../models/user')
const Purchase = require('../models/purchase')

module.exports = class purchaseController {
  ///////// CRIAR COMPRA //////////
  static async registerPurchase(req, res) {
    const token = getToken(req)
    const user = await getUserByToken(token)

    // validações
    if (!user) {
      res.status(422).json({ message: 'Usuário não encontrado!' })
      return
    }
    if (!req.body.products) {
      res.status(422).json({ message: 'Produtos são obrigatórios!' })
      return
    }
    if (req.body.products.length === 0) {
      res.status(422).json({ message: 'Produtos são obrigatórios!' })
      return
    }
    if (!req.body.total) {
      res.status(422).json({ message: 'Preço total é obrigatório!' })
      return
    }

    // salvar compra no banco de dados
    const purchase = new Purchase({
      buyer: user._id,
      products: req.body.products,
      total: req.body.total
    })

    try {
      const savedPurchase = await purchase.save()
      const userUpdated = await User.findByIdAndUpdate(
        { _id: user._id },
        {
          $push: { purchases: savedPurchase._id },
          new: true
        }
      )
      res.status(201).json({
        message: `Compra realizada com sucesso!, ${userUpdated}`
      })
    } catch (err) {
      res.status(500).json({ message: err })
      return
    }
  }

  //////// RESGATAR COMPRAS DE UM USUÁRIO //////////
  static async getUserPurchases(req, res) {
    const token = getToken(req)
    const user = await getUserByToken(token)

    try {
      const userWithPurchases = await User.findById(user._id).populate({
        path: 'purchases',
        options: { sort: { date: -1 } },
        populate: {
          path: 'products',
          populate: { path: 'store' }
        }
      })
      res.status(200).json(userWithPurchases.purchases)
    } catch (err) {
      res.status(500).json({ message: err })
      return
    }
  }

  ///////// RESGATAR COMPRA POR ID //////////
  static async getPurchaseById(req, res) {
    try {
      const purchase = await Purchase.findById(req.params.id)
      res.status(200).json(purchase)
    } catch (err) {
      res.status(500).json({ message: err })
      return
    }
  }
}
