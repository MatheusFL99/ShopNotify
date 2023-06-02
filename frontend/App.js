import React from 'react'
import RegisterUser from './src/components/Cadastro'
import LoginUser from './src/components/Login'
import WelcomePage from './src/components/Welcome'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import ProductsPage from './src/components/Products/ProductsPage'

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Produtos" component={ProductsPage} />
        <Stack.Screen name="Cadastro" component={RegisterUser} />
        <Stack.Screen name="Login" component={LoginUser} />
        <Stack.Screen name="Welcome" component={WelcomePage} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
