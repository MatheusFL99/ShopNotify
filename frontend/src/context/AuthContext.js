import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { set } from 'react-native-reanimated'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const register = (name, email, password, confirmpassword) => {
    setIsLoading(true)
    axios
      .post('http://192.168.15.117:5000/api/users/register', {
        name: name,
        email: email,
        password: password,
        confirmpassword: confirmpassword
      })
      .then(res => {
        console.log(res.data)
        setUserToken(res.data.token)
        AsyncStorage.setItem('userToken', res.data.token)
      })
      .catch(err => {
        console.log(err.response.data)
      })
    setIsLoading(false)
  }

  const login = (email, password) => {
    setIsLoading(true)
    axios
      .post('http://192.168.15.117:5000/api/users/login', {
        email: email,
        password: password
      })
      .then(res => {
        console.log(res.data)
        setUserToken(res.data.token)
        AsyncStorage.setItem('userToken', res.data.token)
      })
      .catch(err => {
        console.log(err.response.data)
      })
    setIsLoading(false)
  }

  const logout = () => {
    setIsLoading(true)
    setUserToken(null)
    AsyncStorage.removeItem('userToken')
    setIsLoading(false)
    console.log('Usuário deslogado')
  }

  const isLoggedIn = async () => {
    try {
      setIsLoading(true)
      const userToken = await AsyncStorage.getItem('userToken')
      setUserToken(userToken)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    isLoggedIn()
  }, [])

  return (
    <AuthContext.Provider
      value={{ register, login, logout, isLoading, userToken }}
    >
      {children}
    </AuthContext.Provider>
  )
}
