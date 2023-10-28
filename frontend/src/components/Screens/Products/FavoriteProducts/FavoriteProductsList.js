import React, { useEffect, useState, useContext } from 'react'
import { FlatList, StyleSheet, View, Text } from 'react-native'
import axios from 'axios'
import FavoriteProductCard from './FavoriteProductCard'
import defaultUrl from '../../../../utils/defaultUrl'
import { AuthContext } from '../../../../context/AuthContext'

export default function FavoriteProductsList() {
  const [products, setProducts] = useState([])
  const defaultURL = defaultUrl()
  const [searchQuery, setSearchQuery] = useState('')
  const { userToken } = useContext(AuthContext)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [userToken])

  const fetchProducts = async () => {
    try {
      setRefreshing(true)
      const response = await axios.get(`${defaultURL}/products/favorites`, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
      setProducts(response.data)
    } catch (error) {
      console.log(error.response.data)
    } finally {
      setRefreshing(false)
    }
  }

  const filteredProducts = products.filter(product => {
    return product.title.toLowerCase().includes(searchQuery.toLowerCase())
  })

  if (products.length === 0) {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Text>Produtos adicionados aos favoritos</Text>
        <Text>vão aparacer aqui.</Text>
      </View>
    )
  }

  return (
    <View>
      <FlatList
        data={filteredProducts}
        keyExtractor={product => product._id}
        renderItem={({ item }) => <FavoriteProductCard {...item} />}
        contentContainerStyle={{
          paddingHorizontal: 15
        }}
        refreshing={refreshing}
        onRefresh={fetchProducts}
      />
    </View>
  )
}
