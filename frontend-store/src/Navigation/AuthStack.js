import React from 'react'
import RegisterStore from '../components/Screens/AuthPages/RegisterPage'
import LoginStore from '../components/Screens/AuthPages/LoginPage'
import WelcomePage from '../components/Screens/WelcomePage'
import Primeira from '../components/Screens/OnBoard'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

const AuthStack = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName="Primeira Pagina"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Cadastro" component={RegisterStore} />
        <Stack.Screen name="Login" component={LoginStore} />
        <Stack.Screen name="Welcome" component={WelcomePage} />
        <Stack.Screen name="Primeira Pagina" component={Primeira} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AuthStack
