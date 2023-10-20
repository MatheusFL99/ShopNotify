const router = require('express').Router()
const userController = require('../controllers/userController')
const storeController = require('../controllers/storeController')
const productController = require('../controllers/productController')
const purchaseController = require('../controllers/purchaseController')

const verifyStore = require('../helpers/verify-store-token')
const verifyUser = require('../helpers/verify-user-token')

// rotas definidas pra api usuários
router.post('/users/register', userController.register)
router.post('/users/login', userController.login)
router.get('/users/checkuser', userController.checkUser)
router.get('/users/:id', userController.getUserById)

// rotas definidas para api lojas
router.post('/stores/register', storeController.register)
router.post('/stores/login', storeController.login)

// rotas definidas para a api products
router.post('/products/create', verifyStore, productController.createProduct)
router.get(
  '/products/myProducts',
  verifyStore,
  productController.getStoreProducts
)
router.get('/products/list', productController.listProducts)
router.get(
  '/products/favorites',
  verifyUser,
  productController.getFavoriteProducts
)
router.put(
  '/products/addtofavorites',
  verifyUser,
  productController.addProductToFavorites
)
router.put(
  '/products/removefavorite',
  verifyUser,
  productController.removeProductFromFavorites
)
router.put('/products/edit/:id', verifyStore, productController.editProduct)
router.delete('/products/:id', verifyStore, productController.removeProduct)
router.get('/products/:id', productController.getProductById)
router.get('/products/store/:id', productController.getProductsByStore)

// rotas definidas para a api purchases
router.post(
  '/purchases/register',
  verifyUser,
  purchaseController.registerPurchase
)
router.get(
  '/purchases/mypurchases',
  verifyUser,
  purchaseController.getUserPurchases
)
router.get('/purchases/:id', purchaseController.getPurchaseById)

module.exports = router
