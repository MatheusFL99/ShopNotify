const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const Product = require('../models/product')
const User = require('../models/user')
const Purchase = require('../models/purchase')

module.exports = class purchaseController {
  //////// ADICIONAR PRODUTO AO CARRINHO //////////
  static async addToCart(req, res) {
    const token = getToken(req)
    const user = await getUserByToken(token)

    // validações
    if (!user) {
      res.status(422).json({ message: 'Usuário não encontrado!' })
      return
    }
    if (!req.body.productId) {
      res.status(422).json({ message: 'Produto é obrigatório!' })
      return
    }

    try {
      const product = await Product.findById(req.body.productId)
      const userUpdated = await User.findByIdAndUpdate(
        { _id: user._id },
        {
          $push: { cart: product._id },
          new: true
        }
      )
      res.status(200).json({
        message: `Produto adicionado ao carrinho com sucesso!, ${product.title}`
      })
    } catch (err) {
      res.status(500).json({ message: err })
      return
    }
  }

  //////// REMOVER PRODUTO DO CARRINHO //////////
  static async removeFromCart(req, res) {
    const token = getToken(req)
    const user = await getUserByToken(token)

    // validações
    if (!user) {
      res.status(422).json({ message: 'Usuário não encontrado!' })
      return
    }
    if (!req.body.productId) {
      res.status(422).json({ message: 'Produto é obrigatório!' })
      return
    }
    if (!user.cart.includes(req.body.productId)) {
      res.status(422).json({ message: 'Produto não está no carrinho!' })
      return
    }

    try {
      const product = await Product.findById(req.body.productId)
      const userUpdated = await User.findByIdAndUpdate(
        { _id: user._id },
        {
          $pull: { cart: product._id },
          new: true
        }
      )
      res.status(200).json({
        message: `Produto removido do carrinho com sucesso!, ${userUpdated}`
      })
    } catch (err) {
      res.status(500).json({ message: err })
      return
    }
  }

  //////// RESGATAR CARRINHO DO USUÁRIO //////////
  static async getUserCart(req, res) {
    const token = getToken(req)
    const user = await getUserByToken(token)

    try {
      const userWithCart = await User.findById(user._id).populate({
        path: 'cart',
        options: { sort: { date: -1 } }
      })
      res.status(200).json(userWithCart.cart)
    } catch (err) {
      res.status(500).json({ message: err })
      return
    }
  }

  //////// FINALIZAR COMPRA PELO APLICATIVO //////////
  static async registerPurchaseInApp(req, res) {
    const token = getToken(req)
    const user = await getUserByToken(token)
    const total = req.body.total

    // validações
    if (!user) {
      res.status(422).json({ message: 'Usuário não encontrado!' })
      return
    }
    if (!user.cart.length) {
      res.status(422).json({ message: 'O carrinho está vazio!' })
      return
    }
    if (!total) {
      res.status(422).json({ message: 'O preço da compra é obrigatório!' })
      return
    }

    try {
      const purchase = await Purchase.create({
        buyer: user._id,
        products: user.cart,
        total: total
      })

      const userUpdated = await User.findByIdAndUpdate(
        { _id: user._id },
        {
          $push: { purchases: purchase._id },
          $set: { cart: [] },
          new: true
        }
      )

      res.status(200).json({
        message: `Compra finalizada com sucesso!, ${
          (userUpdated, 'Total: ' + ' R$ ' + total)
        }`
      })
    } catch (err) {
      res.status(500).json({ message: err })
      return
    }
  }

  /////// RESGATAR PRODUTOS QUE FORAM VENDIDOS POR UMA LOJA //////////
  static async getStoreProductsSold(req, res) {
    const token = getToken(req)
    const store = await getUserByToken(token)

    try {
      const products = await Product.find({ 'store._id': store._id })
      const productsSold = await Purchase.find({
        products: { $in: products }
      }).populate({
        path: 'products',
        populate: { path: 'store' }
      })
      res.status(200).json(productsSold)
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
