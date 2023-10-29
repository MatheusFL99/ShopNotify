import React from 'react'
import ProductsPage from '../components/Screens/Products/ProductsPage'
import { createDrawerNavigator } from '@react-navigation/drawer'
import CustomDrawer from '../components/CustomDrawer'
import FavoriteProductsPage from '../components/Screens/Products/FavoriteProducts/FavoriteProductsPage'
import ProfileScreen from '../components/Screens/ProfileScreen'
import MyPurchases from '../components/Screens/Mypurchases'
import EditProfileScreen from '../components/Screens/EditProfileScreen'
import AddressesScreen from '../components/Screens/Adresses/AddressesScreen'
import CreateAddressScreen from '../components/Screens/Adresses/CreateAddressScreen'
import EditAddressScreen from '../components/Screens/Adresses/EditAddressScreen'

const Drawer = createDrawerNavigator()

const AppStack = () => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Produtos" component={ProductsPage} />
      <Drawer.Screen
        name="Favoritos"
        component={FavoriteProductsPage}
        options={{ drawerItemStyle: { display: 'none' } }}
      />
      <Drawer.Screen
        name="Minhas compras"
        component={MyPurchases}
        options={{ drawerItemStyle: { display: 'none' } }}
      />
      <Drawer.Screen name="Perfil" component={ProfileScreen} />
      <Drawer.Screen
        name="Editar Perfil"
        component={EditProfileScreen}
        options={{ drawerItemStyle: { display: 'none' } }}
      />
      <Drawer.Screen
        name="Endereços"
        component={AddressesScreen}
        options={{ drawerItemStyle: { display: 'none' } }}
      />
      <Drawer.Screen
        name="Adicionar Endereço"
        component={CreateAddressScreen}
        options={{ drawerItemStyle: { display: 'none' } }}
      />
      <Drawer.Screen
        name="Editar Endereço"
        component={EditAddressScreen}
        options={{ drawerItemStyle: { display: 'none' } }}
      />
    </Drawer.Navigator>
  )
}

export default AppStack
