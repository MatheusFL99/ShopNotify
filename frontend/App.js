import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RegisterUser from './src/components/Cadastro'
import LoginUser from './src/components/Login'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Cadastro" component={RegisterUser} />
        <Stack.Screen name="Login" component={LoginUser} />
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
