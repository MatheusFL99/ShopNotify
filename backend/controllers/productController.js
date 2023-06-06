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
    if (!image) {
      res.status(422).json({ message: 'Imagem do produto é obrigatória!' })
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
      description,
      category,
      price,
      image,
      store: {
        _id: store.id,
        name: store.name
      }
    })

    try {
      const newProduct = await product.save()
      res.status(201).json(newProduct)
    } catch (err) {
      res.status(500).json({ message: err })
      return
    }
  }

  /////////////// LISTAR PRODUTOS ///////////////
  static async listProducts(req, res) {
    try {
      const products = await Product.find()
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
      res.status(201).json(userUpdated.favoriteProducts)
    } catch (err) {
      res.status(500).json({ message: err })
      return
    }
  }
}
