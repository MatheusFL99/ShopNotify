import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import defaultUrl from '../utils/defaultUrl'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const defaultURL = defaultUrl()
  const [storeToken, setStoreToken] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const register = (name, email, password, confirmpassword) => {
    setIsLoading(true)
    axios
      .post(`${defaultURL}/stores/register`, {
        name: name,
        email: email,
        password: password,
        confirmpassword: confirmpassword
      })
      .then(res => {
        console.log(res.data)
        setStoreToken(res.data.token)
        AsyncStorage.setItem('storeToken', res.data.token)
      })
      .catch(err => {
        console.log(err.response.data)
      })
    setIsLoading(false)
  }

  const login = (email, password) => {
    setIsLoading(true)
    axios
      .post(`${defaultURL}/stores/login`, {
        email: email,
        password: password
      })
      .then(res => {
        console.log(res.data)
        setStoreToken(res.data.token)
        AsyncStorage.setItem('storeToken', res.data.token)
      })
      .catch(err => {
        console.log(err.response.data)
      })
    setIsLoading(false)
  }

  const logout = () => {
    setIsLoading(true)
    setStoreToken(null)
    AsyncStorage.removeItem('storeToken')
    setIsLoading(false)
    console.log('Usuário deslogado')
  }

  const isLoggedIn = async () => {
    try {
      setIsLoading(true)
      const storeToken = await AsyncStorage.getItem('storeToken')
      setStoreToken(storeToken)
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
      value={{ register, login, logout, isLoading, storeToken }}
    >
      {children}
    </AuthContext.Provider>
  )
}
