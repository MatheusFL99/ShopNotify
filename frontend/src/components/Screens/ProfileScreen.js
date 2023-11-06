import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import defaultUrl from '../../utils/defaultUrl'
import { AuthContext } from '../../context/AuthContext'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import axios from 'axios'
import { useFocusEffect } from '@react-navigation/native'

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
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
    } finally {
      setRefreshing(false)
    }
  }

  handleRefresh = () => {
    setRefreshing(true)
    fetchUserData()
  }

  useEffect(() => {
    handleRefresh()
  }, [userToken])

  const myAddressHandler = () => {
    navigation.navigate('Endereços')
  }

  const editProfileHandler = () => {
    navigation.navigate('Editar Perfil')
  }

  const myPurchasesHandler = () => {
    navigation.navigate('Minhas compras')
  }

  const myFavoritesHandler = () => {
    navigation.navigate('Favoritos')
  }

  const paymentMethodsHandler = () => {
    navigation.navigate('Pagamentos')
  }

  return (
    <View style={styles.container}>
      {user && (
        <>
          <View style={styles.header}>
            <Image source={{ uri: defaultImage }} style={styles.profileImage} />
            <Text style={styles.profileName}>{user.name}</Text>
          </View>
          <TouchableOpacity style={styles.item} onPress={myPurchasesHandler}>
            <MaterialCommunityIcons name="shopping" size={24} color="red" />
            <View style={styles.textContainer}>
              <Text style={styles.itemText}>Minhas compras</Text>
              <Text style={styles.itemDescription}>
                Veja o histórico de suas compras
              </Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={myFavoritesHandler}>
            <MaterialCommunityIcons
              name="heart-outline"
              size={24}
              color="red"
            />
            <View style={styles.textContainer}>
              <Text style={styles.itemText}>Favoritos</Text>
              <Text style={styles.itemDescription}>
                Gerencie seus produtos favoritos
              </Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={myAddressHandler}>
            <MaterialCommunityIcons
              name="map-marker-outline"
              size={24}
              color="red"
            />
            <View style={styles.textContainer}>
              <Text style={styles.itemText}>Endereços</Text>
              <Text style={styles.itemDescription}>
                Gerencie seus endereços
              </Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={paymentMethodsHandler}>
            <MaterialCommunityIcons
              name="credit-card-outline"
              size={24}
              color="red"
            />
            <View style={styles.textContainer}>
              <Text style={styles.itemText}>Pagamento</Text>
              <Text style={styles.itemDescription}>
                Gerencie suas formas de pagamento
              </Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <MaterialCommunityIcons name="bell-outline" size={24} color="red" />
            <View style={styles.textContainer}>
              <Text style={styles.itemText}>Notificações</Text>
              <Text style={styles.itemDescription}>
                Visualize suas notificações
              </Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={editProfileHandler}>
            <MaterialCommunityIcons
              name="account-edit-outline"
              size={24}
              color="red"
            />
            <View style={styles.textContainer}>
              <Text style={styles.itemText}>Editar perfil</Text>
              <Text style={styles.itemDescription}>
                Altere suas informações pessoais
              </Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="gray" />
          </TouchableOpacity>
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
