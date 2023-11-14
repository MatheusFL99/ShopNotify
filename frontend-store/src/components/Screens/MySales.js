import React, { useState, useContext, useCallback } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  RefreshControl,
  Image
} from 'react-native'
import axios from 'axios'
import defaultUrl from '../../utils/defaultUrl'
import { AuthContext } from '../../context/AuthContext'
import { useFocusEffect } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'

const MySales = () => {
  const [sales, setSales] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const { storeToken } = useContext(AuthContext)
  const defaultURL = defaultUrl()

  const fetchSales = async () => {
    try {
      const response = await axios.get(`${defaultURL}/purchases/mysales`, {
        headers: {
          Authorization: `Bearer ${storeToken}`
        }
      })
      const data = response.data.reverse()
      console.log('Fetched Data:', data)
      setSales(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setRefreshing(false)
    }
  }

  const handleRefresh = () => {
    setRefreshing(true)
    fetchSales()
  }

  useFocusEffect(
    useCallback(() => {
      handleRefresh()
    }, [storeToken])
  )

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={sales}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: item.products[0].image }}
              style={styles.image}
            />
            <View style={styles.infoContainer}>
              <Text style={styles.title}>{item.products[0].title}</Text>
              <View style={styles.detailContainer}>
                <MaterialIcons name="attach-money" size={18} color="green" />
                <Text style={styles.price}>R$ {item.products[0].price}</Text>
              </View>
              <View style={styles.detailContainer}>
                <MaterialIcons name="event" size={18} color="gray" />
                <Text style={styles.date}>
                  {new Date(item.date).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                  })}
                </Text>
              </View>
            </View>
          </View>
        )}
        keyExtractor={item => item._id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 10,
    alignItems: 'center'
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
    marginLeft: 5
  },
  date: {
    fontSize: 14,
    color: 'gray',
    marginLeft: 5
  }
})

export default MySales
