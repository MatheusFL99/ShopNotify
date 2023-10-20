import React, { useEffect, useState, useContext } from 'react'
import { FlatList, StyleSheet, TextInput, View, Text } from 'react-native' // Added Text import
import axios from 'axios'
import FavoriteProductCard from './FavoriteProductCard'
import defaultUrl from '../../../../utils/defaultUrl'
import { AuthContext } from '../../../../context/AuthContext'

export default function FavoriteProductsList() {
  const [products, setProducts] = useState([])
  const defaultURL = defaultUrl()
  const [searchQuery, setSearchQuery] = useState('')
  const { userToken } = useContext(AuthContext)

  useEffect(() => {
    fetchProducts()
  }, [userToken])

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${defaultURL}/products/favorites`, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })

      setProducts(response.data)
    } catch (error) {
      console.log(error.response.data)
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
      <TextInput
        style={styles.searchInput}
        placeholder="Pesquisar..."
        onChangeText={text => setSearchQuery(text)}
        value={searchQuery}
      />
      <FlatList
        data={filteredProducts}
        keyExtractor={product => product._id}
        renderItem={({ item }) => <FavoriteProductCard {...item} />}
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
