import React from 'react'
import ProductsPage from '../components/Screens/Products/ProductsPage'
import { createDrawerNavigator } from '@react-navigation/drawer'
import myCoupons from '../components/Screens/Coupons'
import CustomDrawer from '../components/CustomDrawer'
import FavoriteProducts from '../components/Screens/Products/FavoriteProducts'

const Drawer = createDrawerNavigator()

const AppStack = () => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Produtos" component={ProductsPage} />
      <Drawer.Screen name="Cupons" component={myCoupons} />
      <Drawer.Screen name="Favoritos" component={FavoriteProducts} />
    </Drawer.Navigator>
  )
}

export default AppStack
