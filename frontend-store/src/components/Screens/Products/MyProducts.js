import React, { useContext, useCallback, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Alert,
  RefreshControl,
  SafeAreaView
} from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import defaultUrl from '../../../utils/defaultUrl'
import { AuthContext } from '../../../context/AuthContext'
import axios from 'axios'

const MyProducts = ({ navigation }) => {
  const [products, setProducts] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const { storeToken } = useContext(AuthContext)
  const defaultURL = defaultUrl()

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${defaultURL}/products/myproducts`, {
        headers: {
          Authorization: `Bearer ${storeToken}`
        }
      })
      const data = response.data.reverse()
      console.log('Fetched Data:', data)
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setRefreshing(false)
    }
  }

  const handleRefresh = () => {
    setRefreshing(true)
    fetchProducts()
  }

  useFocusEffect(
    useCallback(() => {
      handleRefresh()
    }, [storeToken])
  )

  const addProductHandler = () => {
    navigation.navigate('Adicionar Produto')
  }

  const editProductHandler = productId => {
    navigation.navigate('Editar Produto', { productId })
  }

  const deleteProduct = async productId => {
    const response = await axios.delete(`${defaultURL}/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${storeToken}`
      }
    })
    if (response.status === 200) {
      Alert.alert('Success', 'Produto deletado com sucesso!')
      fetchProducts()
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={addProductHandler}>
          <Text style={styles.buttonText}>Adicionar Produto</Text>
        </TouchableOpacity>
      </View>
      <SafeAreaView style={styles.flatListContainer}>
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <View style={styles.productCard}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={styles.productDetails}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productPrice}>
                  {item.finalPrice.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </Text>
              </View>
              <View style={styles.buttons}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => editProductHandler(item._id)}
                >
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteProduct(item._id)}
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f7f7f7'
  },
  flatListContainer: {
    flex: 1
  },
  addButtonContainer: {
    marginVertical: 10,
    paddingHorizontal: 10
  },
  addButton: {
    backgroundColor: '#836FFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center'
  },
  productCard: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#ffffff',
    marginVertical: 5,
    borderRadius: 10
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 35
  },
  productDetails: {
    flex: 2,
    marginLeft: 10,
    justifyContent: 'center'
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  productPrice: {
    color: 'gray'
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  editButton: {
    backgroundColor: '#4CAF50',
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
    color: 'white',
    fontSize: 14
  }
})

export default MyProducts
