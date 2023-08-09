import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../../../context/AuthContext'
import axios from 'axios'
import defaultUrl from '../../../../utils/defaultUrl'
import { FlatList } from 'react-native-gesture-handler'

const FavoriteProducts = () => {
  const [favProducts, setFavProducts] = useState([])
  const { userToken } = useContext(AuthContext)
  const defaultURL = defaultUrl()

  const fetchFavProducts = async () => {
    await axios
      .get(`${defaultURL}/products/favorites`, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
      .then(res => {
        setFavProducts(res.data)
      })
      .catch(err => {
        console.log(err.response.data)
      })
  }

  useEffect(() => {
    fetchFavProducts()
  }, [])

  return (
    <FlatList>
      data={favProducts}
      keyExtractor={product => product._id}
      renderItem={({ item }) => <ProductCard {...item} />}
      contentContainerStyle=
      {{
        paddingHorizontal: 15
      }}
    </FlatList>
  )
}

export default FavoriteProducts
