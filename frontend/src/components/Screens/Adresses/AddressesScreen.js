import React, { useState, useContext, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView
} from 'react-native'
import defaultUrl from '../../../utils/defaultUrl'
import { AuthContext } from '../../../context/AuthContext'
import axios from 'axios'

const AddressesScreen = ({ navigation }) => {
  const [addresses, setAddresses] = useState([])
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
    }
  }

  useEffect(() => {
    fetchUserAddresses()
  }, [userToken])

  const handleAddAddress = () => {
    navigation.navigate('Adicionar Endereço')
  }

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
            <Text style={styles.name}>{item.streetadress}</Text>
            {item.complement && <Text>{item.complement}</Text>}
            <Text style={styles.location}>
              {item.city} - {item.state}
            </Text>
          </View>
        )}
        keyExtractor={item => item._id}
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
  }
})

export default AddressesScreen
