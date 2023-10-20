import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import defaultUrl from '../../utils/defaultUrl'
import { AuthContext } from '../../context/AuthContext'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import axios from 'axios'

const ProfileScreen = () => {
  const [user, setUser] = useState(null)
  const defaultURL = defaultUrl()
  const defaultImage = 'https://i.stack.imgur.com/l60Hf.png'
  const { userToken } = useContext(AuthContext)

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
      {user && (
        <>
          <View style={styles.header}>
            <Image source={{ uri: defaultImage }} style={styles.profileImage} />
            <Text style={styles.profileName}>{user.name}</Text>
          </View>
          {[
            {
              icon: 'shopping',
              title: 'Minhas compras',
              desc: 'Veja o histórico de suas compras'
            },
            {
              icon: 'heart-outline',
              title: 'Favoritos',
              desc: 'Gerencie seus produtos favoritos'
            },
            {
              icon: 'map-marker-outline',
              title: 'Endereços',
              desc: 'Gerencie seus endereços'
            },
            {
              icon: 'credit-card-outline',
              title: 'Pagamentos',
              desc: 'Altere seus métodos de pagamento'
            },
            {
              icon: 'bell-outline',
              title: 'Notificações',
              desc: 'Visualize sua notificações'
            },
            {
              icon: 'account-edit-outline',
              title: 'Editar perfil',
              desc: 'Altere suas informações pessoais'
            }
          ].map((item, index) => (
            <TouchableOpacity key={index} style={styles.item}>
              <MaterialCommunityIcons name={item.icon} size={24} color="red" />
              <View style={styles.textContainer}>
                <Text style={styles.itemText}>{item.title}</Text>
                <Text style={styles.itemDescription}>{item.desc}</Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          ))}
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: 'white'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  item: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center'
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  itemDescription: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5
  }
})

export default ProfileScreen
