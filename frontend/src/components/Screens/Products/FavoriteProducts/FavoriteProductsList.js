import React, { useState, useContext, useCallback } from 'react'
import {
  FlatList,
  View,
  Text,
  RefreshControl,
  Dimensions,
  StyleSheet
} from 'react-native'
import axios from 'axios'
import FavoriteProductCard from './FavoriteProductCard'
import defaultUrl from '../../../../utils/defaultUrl'
import { AuthContext } from '../../../../context/AuthContext'
import { useFocusEffect } from '@react-navigation/native'

const FavoriteProductsList = () => {
  const [products, setProducts] = useState([])
  const defaultURL = defaultUrl()
  const [searchQuery, setSearchQuery] = useState('')
  const { userToken } = useContext(AuthContext)
  const [refreshing, setRefreshing] = useState(false)

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${defaultURL}/products/favorites`, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
      setProducts(response.data.reverse())
    } catch (error) {
      console.log(error.response.data)
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
    }, [userToken])
  )

  const filteredProducts = products.filter(product => {
    return product.title.toLowerCase().includes(searchQuery.toLowerCase())
  })

  if (products.length === 0) {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Text>Você não adicionou nenhum produto aos favoritos.</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredProducts}
        keyExtractor={product => product._id}
        renderItem={({ item }) => <FavoriteProductCard {...item} />}
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

export default FavoriteProductsList
