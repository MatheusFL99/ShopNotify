import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, TextInput, View } from 'react-native'
import axios from 'axios'
import ProductCard from './ProductCard'
import defaultUrl from '../../../utils/defaultUrl'

export default function ProductsList() {
  const [products, setProducts] = useState([])
  const defaultURL = defaultUrl()
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${defaultURL}/products/list`)
      setProducts(response.data)
    } catch (error) {
      console.error('Erro ao buscar os produtos:', error)
    }
  }

  const filteredProducts = products.filter(product => {
    return product.category.toLowerCase().includes(searchQuery.toLowerCase())
  })

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
