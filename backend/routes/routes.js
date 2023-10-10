const router = require('express').Router()
const userController = require('../controllers/userController')
const storeController = require('../controllers/storeController')
const couponController = require('../controllers/couponController')
const productController = require('../controllers/productController')

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

// rotas definidas para api cupons
router.post('/coupons/create', verifyStore, couponController.createCoupon)
router.post('/coupons/redeem', verifyUser, couponController.redeemCoupon)
router.post('/coupons/list', verifyStore, couponController.listCoupons)
router.get('/coupons/:id', couponController.getCouponById)
router.get('/coupons/store/:id', couponController.getCouponsByStore)

// rotas definidas para a api products
router.post('/products/create', verifyStore, productController.createProduct)
router.get('/products/list', productController.listProducts)
router.get('/products/:id', productController.getProductById)
router.get('/products/store/:id', productController.getProductsByStore)
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
router.get(
  '/products/favorites',
  verifyUser,
  productController.getFavoriteProducts
)
router.get('/products/myProducts', productController.getAllStoreProducts)

module.exports = router
