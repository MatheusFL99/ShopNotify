import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import axios from 'axios'
import ProductCard from './ProductCard'

export default function ProductsList() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        'http://192.168.15.117:5000/api/products/list'
      )
      setProducts(response.data)
    } catch (error) {
      console.error('Erro ao buscar os produtos:', error)
    }
  }

  return (
    <FlatList
      data={products}
      keyExtractor={product => product._id}
      renderItem={({ item }) => <ProductCard {...item} />}
      contentContainerStyle={{
        paddingHorizontal: 15
      }}
    />
  )
}
