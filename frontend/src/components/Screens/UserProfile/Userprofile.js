import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import axios from 'axios'
import defaultUrl from '../../../utils/defaultUrl'
import { AuthContext } from '../../../context/AuthContext'

const Userprofile = () => {
  const [user, setUser] = useState({})
  const defaultURL = defaultUrl()
  const { userToken } = useContext(AuthContext)
  const defaultImage = 'https://i.stack.imgur.com/l60Hf.png'
  //get user data from backend
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${defaultURL}/users/checkuser`, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
      setUser(response.data)
    } catch (error) {
      console.error('Erro ao buscar os dados do usuário:', error)
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [userToken])

  return (
    <View style={styles.container}>
      <Image source={{ uri: defaultImage }} style={styles.profileImage} />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.bio}>{user.bio}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  bio: {
    fontSize: 16,
    textAlign: 'center'
  }
})

export default Userprofile
