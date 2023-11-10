import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useFocusEffect } from '@react-navigation/native'

const LogoutComponent = () => {
  const { logout } = useContext(AuthContext)
  useFocusEffect(
    React.useCallback(() => {
      logout()
      return () => {}
    }, [logout])
  )
  return null
}

export default LogoutComponent
