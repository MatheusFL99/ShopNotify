import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RegisterUser from './src/components/Cadastro'
import LoginUser from './src/components/Login'
import CuponsScreen from './src/components/Home/CouponsScreen'
import CouponDetails from './src/components/Home/CouponDetails'
import WelcomePage from './src/components/Welcome'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Cupons" component={CuponsScreen} />
        <Stack.Screen name="DetalhesCupon" component={CouponDetails} />
        <Stack.Screen name="Cadastro" component={RegisterUser} />
        <Stack.Screen name="Login" component={LoginUser} />
        <Stack.Screen name="Welcome" component={WelcomePage} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5',
    padding: 80
  }
})
