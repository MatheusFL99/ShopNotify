import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthStack from './AuthStack'
import AppStack from './AppStack'
import { AuthContext } from '../context/AuthContext'
import { ActivityIndicator, View } from 'react-native'

const AppNav = () => {
  const { isLoading, storeToken } = useContext(AuthContext)

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} />
      </View>
    )
  }

  return (
    <NavigationContainer>
      {storeToken !== null ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  )
}

export default AppNav
