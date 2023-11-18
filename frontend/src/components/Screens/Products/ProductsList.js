import React, { useState, useCallback } from 'react'
import {
  FlatList,
  StyleSheet,
  TextInput,
  View,
  Text,
  RefreshControl,
  Dimensions
} from 'react-native'
import axios from 'axios'
import ProductCard from './ProductCard'
import defaultUrl from '../../../utils/defaultUrl'
import { useFocusEffect } from '@react-navigation/native'

const ProductsList = () => {
  const [products, setProducts] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const defaultURL = defaultUrl()
  const [searchQuery, setSearchQuery] = useState('')

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${defaultURL}/products/list`)
      setProducts(response.data)
    } catch (error) {
      console.error('Erro ao buscar os produtos:', error)
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
    }, [])
  )

  const filterProducts = product => {
    const query = searchQuery.toLowerCase()
    return (
      product.title.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.store.name.toLowerCase().includes(query)
    )
  }

  const filteredProducts = products.filter(filterProducts)

  if (products.length === 0) {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Text>Nenhum produto foi encontrado.</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
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
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['red']}
          />
        }
      />
    </View>
  )
}

const { width } = Dimensions.get('window')
const cardMargin = 10
const cardWidth = width - 2 * cardMargin

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  searchInput: {
    height: 50,
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    margin: cardMargin,
    padding: 10,
    width: cardWidth
  },
  listContent: {
    paddingHorizontal: cardMargin
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  productCard: {
    width: cardWidth,
    marginVertical: 10
  }
})

export default ProductsList
