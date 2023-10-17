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

    // validations (similar to the create function)
    // ... (reuse the same validation steps as createProduct)

    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        {
          title,
          price,
          discount,
          description,
          category,
          image
        },
        { new: true }
      ) // { new: true } returns the updated product

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
      res.status(201).json(userUpdated.favoriteProducts)
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
      if (!user) {
        throw new Error('Usuário não encontrado')
      }

      const favoriteProductIds = user.favoriteProducts
      const favoriteProducts = await Product.find({
        _id: { $in: favoriteProductIds.map(ObjectId) }
      }).toArray()

      res.json(favoriteProducts)
    } catch (error) {
      res.status(500).json({ error: 'Erro ao recuperar produtos favoritos' })
    }
  }

  ////////////// LISTAR PRODUTOS DE UMA LOJA //////////////
  static async getAllStoreProducts(req, res) {
    const token = getToken(req)
    const store = await getStoreByToken(token)

    const products = await Product.find({ 'store._id': store._id })

    res.status(200).json({
      products
    })
  }
}
