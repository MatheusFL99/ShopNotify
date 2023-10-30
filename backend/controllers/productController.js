const getStoreByToken = require('../helpers/get-store-by-token')
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const Product = require('../models/product')
const User = require('../models/user')

module.exports = class productController {
  /////////////// CRIAR PRODUTO ///////////////
  static async createProduct(req, res) {
    const { title, price, discount, description, category, image } = req.body

    // validações
    if (!title) {
      res.status(422).json({ message: 'Nome do produto é obrigatório!' })
      return
    }
    if (!price) {
      res.status(422).json({ message: 'Preço do produto é obrigatória!' })
      return
    }
    if (!description) {
      res.status(422).json({ message: 'Descrição do produto é obrigatória!' })
      return
    }
    if (!category) {
      res.status(422).json({ message: 'Categoria do produto é obrigatório!' })
      return
    }

    if (price <= 0) {
      res.status(422).json({ message: 'Preço do produto é inválido!' })
      return
    }

    //pegar token da loja
    const token = getToken(req)
    const store = await getStoreByToken(token)

    //salvar produto no banco de dados
    const product = new Product({
      title,
      price,
      discount,
      finalPrice: price - (price * discount) / 100,
      description,
      category,
      image,
      store: {
        _id: store.id,
        name: store.name
      }
    })

    try {
      const newProduct = await product.save()
      res.status(200).json(newProduct)
    } catch (err) {
      res.status(500).json({ message: err })
      return
    }
  }

  //////////////// EDITAR PRODUTO ///////////////
  static async editProduct(req, res) {
    const productId = req.params.id
    const { title, price, discount, description, category, image } = req.body

    // validações
    if (!title) {
      res.status(422).json({ message: 'Nome do produto é obrigatório!' })
      return
    }
    if (!price) {
      res.status(422).json({ message: 'Preço do produto é obrigatório!' })
      return
    }
    if (!description) {
      res.status(422).json({ message: 'Descrição do produto é obrigatória!' })
      return
    }
    if (!category) {
      res.status(422).json({ message: 'Categoria do produto é obrigatória!' })
      return
    }

    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        {
          title,
          price,
          finalPrice: price - (price * discount) / 100,
          discount,
          description,
          category,
          image
        },
        { new: true }
      )

      if (!updatedProduct) {
        res.status(404).json({ message: 'Produto não encontrado!' })
        return
      }

      res.status(200).json(updatedProduct)
    } catch (err) {
      res.status(500).json({ message: err })
    }
  }

  ///////////// LISTAR TODOS OS PRODUTOS DA LOJA ///////////////
  static async getStoreProducts(req, res) {
    const token = getToken(req)
    const store = await getStoreByToken(token)

    try {
      const products = await Product.find({ 'store._id': store.id })
      res.status(200).json(products)
    } catch (err) {
      res.status(500).json({ message: err })
    }
  }

  /////////////// REMOVER PRODUTO ///////////////
  static async removeProduct(req, res) {
    const productId = req.params.id

    try {
      const product = await Product.findByIdAndRemove(productId)

      if (!product) {
        res.status(404).json({ message: 'Produto não encontrado!' })
        return
      }

      res.status(200).json({ message: 'Produto removido com sucesso!' })
    } catch (err) {
      res.status(500).json({ message: err })
    }
  }

  /////////////// LISTAR PRODUTOS ///////////////
  static async listProducts(req, res) {
    try {
      const products = await Product.find().sort({ createdAt: -1 })
      res.status(200).json(products)
    } catch (err) {
      res.status(500).json({ message: err })
      return
    }
  }

  /////////////// LISTAR PRODUTOS POR LOJA ///////////////
  static async getProductsByStore(req, res) {
    try {
      const products = await Product.find({ 'store._id': req.params.id })
      res.status(200).json(products)
    } catch (err) {
      res.status(500).json({ message: err })
      return
    }
  }

  /////////////// GET PRODUTO POR ID ///////////////
  static async getProductById(req, res) {
    try {
      const product = await Product.findById(req.params.id)
      res.status(200).json(product)
    } catch (err) {
      res.status(500).json({ message: err })
      return
    }
  }

  /////////////// ADICIONAR PRODUTO AOS FAVORITOS ///////////////
  static async addProductToFavorites(req, res) {
    //pegar token do usuário

    const token = getToken(req)
    const user = await getUserByToken(token)

    const { productId } = req.body

    //validações
    if (!productId) {
      res.status(422).json({ message: 'Id do produto é obrigatório!' })
      return
    }

    const userAlreadyHasProduct = user.favoriteProducts.includes(productId)
    if (userAlreadyHasProduct) {
      res.status(422).json({ message: 'Produto já adicionado aos favoritos!' })
      return
    }

    try {
      const userUpdated = await User.findByIdAndUpdate(
        { _id: user._id },
        {
          $push: { favoriteProducts: productId },
          new: true
        }
      )

      res.status(200).json(userUpdated.favoriteProducts)
    } catch (err) {
      res.status(500).json({ message: err })
      return
    }
  }

  /////////////// REMOVER PRODUTO DOS FAVORITOS ///////////////
  static async removeProductFromFavorites(req, res) {
    //pegar token do usuário

    const token = getToken(req)
    const user = await getUserByToken(token)

    const { productId } = req.body

    //validações
    if (!productId) {
      res.status(422).json({ message: 'Id do produto é obrigatório!' })
      return
    }

    const userAlreadyHasProduct = user.favoriteProducts.includes(productId)
    if (!userAlreadyHasProduct) {
      res
        .status(422)
        .json({ message: 'Esse produto não pertence aos seus favoritos!' })
      return
    }

    try {
      const userUpdated = await User.findByIdAndUpdate(
        { _id: user._id },
        {
          $pull: { favoriteProducts: productId }
        }
      )
      res.status(200).json(userUpdated.favoriteProducts)
    } catch (err) {
      res.status(500).json({ message: err })
      return
    }
  }

  ////////////// LISTAR PRODUTOS FAVORITADOS DE UM USUÁRIO //////////////
  static async getFavoriteProducts(req, res) {
    const token = getToken(req)
    const user = await getUserByToken(token)

    try {
      const userWithFavorites = await User.findById(user._id).populate(
        'favoriteProducts'
      )
      res.status(200).json(userWithFavorites.favoriteProducts)
    } catch (err) {
      res.status(500).json({ message: err })
      return
    }
  }

  //////////// CHECAR SE PRODUTO É FAVORITO DO USUÁRIO //////////////
  static async checkIfProductIsFavorite(req, res) {
    const token = getToken(req)
    const user = await getUserByToken(token)

    const { productId } = req.body

    //validações
    if (!productId) {
      res.status(422).json({ message: 'Id do produto é obrigatório!' })
      return
    }

    try {
      const userWithFavorites = await User.findById(user._id).populate(
        'favoriteProducts'
      )
      const userFavorites = userWithFavorites.favoriteProducts
      const userHasProduct = userFavorites.includes(productId)
      res.status(200).json(userHasProduct)
    } catch (err) {
      res.status(500).json({ message: err })
      return
    }
  }
}
