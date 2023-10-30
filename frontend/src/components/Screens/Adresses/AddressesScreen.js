import React, { useState, useContext, useCallback } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Alert,
  RefreshControl
} from 'react-native'
import defaultUrl from '../../../utils/defaultUrl'
import { AuthContext } from '../../../context/AuthContext'
import axios from 'axios'
import { useFocusEffect } from '@react-navigation/native'

const AddressesScreen = ({ navigation }) => {
  const [addresses, setAddresses] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const defaultURL = defaultUrl()
  const { userToken } = useContext(AuthContext)

  const fetchUserAddresses = async () => {
    try {
      const response = await axios.get(`${defaultURL}/address/myaddresses`, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
      const data = response.data
      setAddresses(data)
    } catch (err) {
      console.error('Erro ao resgatar endereços do usuário', err.message)
    } finally {
      setRefreshing(false)
    }
  }

  const handleRefresh = () => {
    setRefreshing(true)
    fetchUserAddresses()
  }

  const handleAddAddress = () => {
    navigation.navigate('Adicionar Endereço')
  }

  const editAddressHandler = addressId => {
    navigation.navigate('Editar Endereço', { addressId })
  }

  const deleteAddress = async addressId => {
    const response = await axios.delete(
      `${defaultURL}/address/delete/${addressId}`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      }
    )
    if (response.status === 200) {
      Alert.alert('Endereço removido com sucesso!')
      fetchUserAddresses()
    } else {
      Alert.alert('Erro ao remover endereço')
    }
  }

  useFocusEffect(
    useCallback(() => {
      handleRefresh()
    }, [userToken])
  )

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={handleAddAddress}>
        <Text>Adicionar novo endereço</Text>
        <Text style={styles.addIcon}></Text>
      </TouchableOpacity>
      <FlatList
        style={styles.flatListStyle}
        data={addresses}
        renderItem={({ item }) => (
          <View style={styles.addressCard}>
            {item.name && <Text style={styles.name}>{item.name}</Text>}
            <Text style={styles.name}>{item.streetaddress}</Text>
            {item.complement && <Text>{item.complement}</Text>}
            <Text style={styles.location}>
              {item.city} - {item.state}
            </Text>
            <View style={styles.buttons}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => editAddressHandler(item._id)}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteAddress(item._id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={item => item._id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: 'white'
  },
  headerContainer: {
    marginBottom: 20
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  addButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15
  },
  addIcon: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  addressCard: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    minHeight: 100
  },
  name: {
    fontSize: 16
  },
  location: {
    fontSize: 14,
    color: 'grey'
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  editButton: {
    backgroundColor: '#2196f3',
    padding: 8,
    borderRadius: 5,
    marginRight: 5
  },
  deleteButton: {
    backgroundColor: '#f44336',
    padding: 8,
    borderRadius: 5
  },
  buttonText: {
    color: '#fff',
    fontSize: 14
  }
})

export default AddressesScreen
