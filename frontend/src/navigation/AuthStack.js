import React from 'react'
import RegisterUser from '../components/Screens/RegisterScreen'
import LoginUser from '../components/Screens/LoginScreen'
import WelcomePage from '../components/Screens/WelcomePage'
import Primeira from '../components/Screens/OnBoardScreen'
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
        <Stack.Screen name="Cadastro" component={RegisterUser} />
        <Stack.Screen name="Login" component={LoginUser} />
        <Stack.Screen name="Welcome" component={WelcomePage} />
        <Stack.Screen name="Primeira Pagina" component={Primeira} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AuthStack
