const router = require('express').Router()
const userController = require('../controllers/userController')
const storeController = require('../controllers/storeController')
const productController = require('../controllers/productController')
const purchaseController = require('../controllers/purchaseController')

const verifyStore = require('../helpers/verify-store-token')
const verifyUser = require('../helpers/verify-user-token')
const addressController = require('../controllers/addressController')
const paymentController = require('../controllers/paymentController')

///////////////////////////////////////////////////////////////////////////////// rotas definidas pra api usuários
router.post('/users/register', userController.register)
router.post('/users/login', userController.login)
router.get('/users/checkuser', userController.checkUser)
router.put('/users/edit/:id', verifyUser, userController.editProfile)
router.get('/users/:id', userController.getUserById)

///////////////////////////////////////////////////////////////////////////////// rotas definidas para api lojas
router.post('/stores/register', storeController.register)
router.post('/stores/login', storeController.login)

///////////////////////////////////////////////////////////////////////////////// rotas definidas para a api address
router.post('/address/create', verifyUser, addressController.createAddress)
router.get(
  '/address/myaddresses',
  verifyUser,
  addressController.getUserAddresses
)
router.delete(
  '/address/delete/:id',
  verifyUser,
  addressController.removeAddress
)
router.put('/address/edit/:id', verifyUser, addressController.editAddress)
router.get('/address/:id', verifyUser, addressController.getAddressById)

///////////////////////////////////////////////////////////////////////////////// rotas definidas para a api products
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
router.post(
  '/products/checkfavoritestatus',
  verifyUser,
  productController.checkIfProductIsFavorite
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

///////////////////////////////////////////////////////////////////////////////// rotas definidas para a api paymentmethods
router.post(
  '/paymentmethod/add',
  verifyUser,
  paymentController.addPaymentMethod
)
router.get(
  '/paymentmethod/mypaymentmethods',
  verifyUser,
  paymentController.getUserPaymentMethods
)
router.delete(
  '/paymentmethod/delete/:id',
  verifyUser,
  paymentController.removePaymentMethod
)

///////////////////////////////////////////////////////////////////////////////// rotas definidas para a api purchases
router.put('/purchases/addtocart', verifyUser, purchaseController.addToCart)
router.put(
  '/purchases/removefromcart',
  verifyUser,
  purchaseController.removeFromCart
)
router.get('/purchases/cart', verifyUser, purchaseController.getUserCart)
router.get(
  '/purchases/mysales',
  verifyStore,
  purchaseController.getStoreProductsSales
)
router.post(
  '/purchases/finalizepurchaseapp',
  verifyUser,
  purchaseController.registerPurchaseInApp
)
router.get(
  '/purchases/mypurchases',
  verifyUser,
  purchaseController.getUserPurchases
)
router.get('/purchases/:id', purchaseController.getPurchaseById)

module.exports = router
