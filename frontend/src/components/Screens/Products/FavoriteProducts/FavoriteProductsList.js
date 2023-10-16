import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../../../context/AuthContext'
import axios from 'axios'
import defaultUrl from '../../../../utils/defaultUrl'
import { FlatList } from 'react-native-gesture-handler'
import FavoriteProductCard from './FavoriteProductCard'

const FavoriteProducts = () => {
  const [favProducts, setFavProducts] = useState([])
  const { userToken } = useContext(AuthContext)
  const defaultURL = defaultUrl()

  const fetchFavProducts = async () => {
    try {
      const response = await axios.get(`${defaultURL}/products/myfavorites`, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })

      setFavProducts(response.data)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  useEffect(() => {
    fetchFavProducts()
  }, [])

  return (
    <FlatList
      data={favProducts}
      keyExtractor={product => product._id}
      renderItem={({ item }) => <FavoriteProductCard {...item} />}
      contentContainerStyle={{
        paddingHorizontal: 15
      }}
    />
  )
}

export default FavoriteProducts
