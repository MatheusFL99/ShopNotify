import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import CustomDrawer from '../components/CustomDrawer'
import MyProducts from '../components/Screens/Products/MyProducts'
import EditProductScreen from '../components/Screens/Products/EditProductScreen'
import AddProductScreen from '../components/Screens/Products/AddProductScreen'

const Drawer = createDrawerNavigator()

const AppStack = () => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Meus Produtos" component={MyProducts} />
      <Drawer.Screen
        name="Editar Produto"
        component={EditProductScreen}
        options={{ drawerItemStyle: { display: 'none' } }}
      />
      <Drawer.Screen
        name="Adicionar Produto"
        component={AddProductScreen}
        options={{ drawerItemStyle: { display: 'none' } }}
      />
    </Drawer.Navigator>
  )
}

export default AppStack
