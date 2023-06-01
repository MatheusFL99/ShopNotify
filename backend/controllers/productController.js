const getStoreByToken = require('../helpers/get-store-by-token')
const getToken = require('../helpers/get-token')
const Product = require('../models/product')

module.exports = class productController {
  /////////////// CRIAR PRODUTO ///////////////
  static async createProduct(req, res) {
    const { name, desc, category, price } = req.body

    // validações
    if (!name) {
      res.status(422).json({ message: 'Nome do produto é obrigatório!' })
      return
    }
    if (!desc) {
      res.status(422).json({ message: 'Descrição do produto é obrigatória!' })
      return
    }
    if (!category) {
      res.status(422).json({ message: 'Categoria do produto é obrigatória!' })
      return
    }
    if (!price) {
      res.status(422).json({ message: 'Preço do produto é obrigatório!' })
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
      name,
      desc,
      category,
      price,
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
}
