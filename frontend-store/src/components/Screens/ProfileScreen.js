import React, { useState, useContext, useCallback } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native'
import defaultUrl from '../../utils/defaultUrl'
import { AuthContext } from '../../context/AuthContext'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import axios from 'axios'
import { useFocusEffect } from '@react-navigation/native'

const ProfileScreen = ({ navigation }) => {
  const [store, setStore] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  const defaultURL = defaultUrl()
  const defaultImage = 'https://i.stack.imgur.com/l60Hf.png'
  const { storeToken, logout } = useContext(AuthContext)

  const fetchStoreData = async () => {
    try {
      const response = await axios.get(`${defaultURL}/stores/checkstore`, {
        headers: {
          Authorization: `Bearer ${storeToken}`
        }
      })
      setStore(response.data)
    } catch (error) {
      console.error('Erro ao buscar os dados do usuário:', error)
    } finally {
      setRefreshing(false)
    }
  }

  handleRefresh = () => {
    setRefreshing(true)
    fetchStoreData()
  }

  useFocusEffect(
    useCallback(() => {
      handleRefresh()
    }, [storeToken])
  )

  const myAddressHandler = () => {
    navigation.navigate('Endereços')
  }

  const editProfileHandler = () => {
    navigation.navigate('Editar Perfil')
  }

  const myPurchasesHandler = () => {
    navigation.navigate('Minhas Vendas')
  }

  const myProductsHandler = () => {
    navigation.navigate('Meus Produtos')
  }

  return (
    <ScrollView style={styles.container}>
      {store && (
        <>
          <View style={styles.header}>
            <Image source={{ uri: defaultImage }} style={styles.profileImage} />
            <Text style={styles.profileName}>{store.name}</Text>
          </View>
          <TouchableOpacity style={styles.item} onPress={myPurchasesHandler}>
            <MaterialCommunityIcons name="shopping" size={24} color="#836FFF" />
            <View style={styles.textContainer}>
              <Text style={styles.itemText}>Minhas vendas</Text>
              <Text style={styles.itemDescription}>
                Veja todas as suas vendas efetuadas
              </Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="gray" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={myProductsHandler}>
            <MaterialCommunityIcons
              name="layers-outline"
              size={24}
              color="#836FFF"
            />
            <View style={styles.textContainer}>
              <Text style={styles.itemText}>Meus produtos</Text>
              <Text style={styles.itemDescription}>Gerencie seus produtos</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="gray" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={editProfileHandler}>
            <MaterialCommunityIcons
              name="account-edit-outline"
              size={24}
              color="#836FFF"
            />
            <View style={styles.textContainer}>
              <Text style={styles.itemText}>Editar perfil</Text>
              <Text style={styles.itemDescription}>
                Altere suas informações pessoais
              </Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={logout}>
            <MaterialCommunityIcons
              name="logout-variant"
              size={24}
              color="#836FFF"
            />
            <View style={styles.textContainer}>
              <Text style={styles.itemText}>Sair</Text>
              <Text style={styles.itemDescription}>
                Desconecte-se da sua conta
              </Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="gray" />
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
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
