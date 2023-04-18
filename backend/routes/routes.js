const router = require('express').Router()
const userController = require('../controllers/userController')
const storeController = require('../controllers/storeController')
const couponController = require('../controllers/couponController')

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

module.exports = router
