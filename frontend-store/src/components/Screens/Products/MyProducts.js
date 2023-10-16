import React, { useState, useEffect, useContext } from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import axios from 'axios'
import defaultUrl from '../../../utils/defaultUrl'
import { AuthContext } from '../../../context/AuthContext'

const MyProducts = () => {
  const [products, setProducts] = useState([])
  const { storeToken } = useContext(AuthContext)
  const defaultURL = defaultUrl()

  useEffect(() => {
    fetchProducts()
  }, [storeToken])

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${defaultURL}/products/myproducts`, {
        headers: {
          Authorization: `Bearer ${storeToken}`
        }
      })
      setProducts(response.data.products)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Erro Axios:', error.message)
      } else {
        console.error('Erro de rede:', error.message)
      }
    }
  }

  // Função para renderizar cada item da lista
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.productItem}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        <Text style={styles.productPrice}>Preço: R$ {item.price}</Text>
        <Text style={styles.productDiscount}>Desconto: {item.discount}%</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Seus Produtos</Text>
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16
  },
  productItem: {
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    elevation: 2
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8
  },
  productDiscount: {
    fontSize: 14,
    color: '#FF5733',
    marginTop: 4
  }
})

export default MyProducts
