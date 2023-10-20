import React from 'react'
import ProductsPage from '../components/Screens/Products/ProductsPage'
import { createDrawerNavigator } from '@react-navigation/drawer'
import myCoupons from '../components/Screens/CouponList'
import CustomDrawer from '../components/CustomDrawer'
import FavoriteProductsPage from '../components/Screens/Products/FavoriteProducts/FavoriteProductsPage'
import ProfileScreen from '../components/Screens/ProfileScreen'
import MyPurchases from '../components/Screens/Mypurchases'

const Drawer = createDrawerNavigator()

const AppStack = () => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Produtos" component={ProductsPage} />
      <Drawer.Screen name="Perfil" component={ProfileScreen} />
      <Drawer.Screen name="Minhas compras" component={MyPurchases} />
      <Drawer.Screen name="Cupons" component={myCoupons} />
      <Drawer.Screen name="Favoritos" component={FavoriteProductsPage} />
    </Drawer.Navigator>
  )
}

export default AppStack
