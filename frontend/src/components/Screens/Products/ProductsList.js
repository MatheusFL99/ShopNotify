import React, { useState, useCallback } from 'react'
import {
  FlatList,
  StyleSheet,
  TextInput,
  View,
  Text,
  RefreshControl
} from 'react-native'
import axios from 'axios'
import ProductCard from './ProductCard'
import defaultUrl from '../../../utils/defaultUrl'
import { useFocusEffect } from '@react-navigation/native'

export default function ProductsList() {
  const [products, setProducts] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const defaultURL = defaultUrl()
  const [searchQuery, setSearchQuery] = useState('')

  useFocusEffect(
    useCallback(() => {
      fetchProducts()
      return () => {}
    }, [fetchProducts])
  )

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${defaultURL}/products/list`)
      setProducts(response.data)
      console.log(response.data)
    } catch (error) {
      console.error('Erro ao buscar os produtos:', error)
    }
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    fetchProducts().then(() => setRefreshing(false))
  }, [fetchProducts])

  const filteredProducts = products.filter(product => {
    return product.title.toLowerCase().includes(searchQuery.toLowerCase())
  })

  if (products.length === 0) {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Text>Nenhum produto foi encontrado.</Text>
      </View>
    )
  }

  return (
    <View>
      <TextInput
        style={styles.searchInput}
        placeholder="Pesquisar..."
        onChangeText={text => setSearchQuery(text)}
        value={searchQuery}
      />
      <FlatList
        data={filteredProducts}
        keyExtractor={product => product._id}
        renderItem={({ item }) => <ProductCard {...item} />}
        contentContainerStyle={{
          paddingHorizontal: 15
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  searchInput: {
    height: 50,
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 10
  }
})
