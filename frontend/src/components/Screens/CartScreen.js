import React, { useContext, useCallback, useState } from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
  RefreshControl
} from 'react-native'
import axios from 'axios'
import defaultUrl from '../../utils/defaultUrl'
import { AuthContext } from '../../context/AuthContext'
import { useFocusEffect } from '@react-navigation/native'

const CartScreen = () => {
  const defaultURL = defaultUrl()
  const { userToken } = useContext(AuthContext)
  const [cart, setCart] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  const fetchUserCart = async () => {
    try {
      const response = await axios.get(`${defaultURL}/purchases/cart`, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
      setCart(response.data.reverse())
    } catch (err) {
      console.error('Erro ao carregar carrinho:', err)
    } finally {
      setRefreshing(false)
    }
  }

  const removeItem = async productId => {
    try {
      const response = await axios.put(
        `${defaultURL}/purchases/removefromcart`,
        {
          productId
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        }
      )
      if (response.status == 200) {
        console.log('Produto removido do carrinho com sucesso!')
        Alert.alert('Produto removido do carrinho com sucesso!')
        handleRefresh()
      }
    } catch (err) {
      console.error('Erro ao deletar produto do carrinho:', err.response.data)
    }
  }

  const handleRefresh = () => {
    setRefreshing(true)
    fetchUserCart()
  }

  useFocusEffect(
    useCallback(() => {
      handleRefresh()
    }, [userToken])
  )

  const valorTotal = cart.reduce((acc, item) => {
    return acc + item.finalPrice
  }, 0)

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.titleContainer}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemTitle}>
          {item.title}
        </Text>
        <Text>
          {item.finalPrice.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          })}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => removeItem(item._id)}
      >
        <Text>Remover</Text>
      </TouchableOpacity>
    </View>
  )

  if (cart.length === 0) {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Text>O seu carrinho está vazio.</Text>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {refreshing ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <FlatList
            data={cart}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
          />
          <View style={styles.footer}>
            <Text>
              Total:{' '}
              {valorTotal.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })}
            </Text>
            <TouchableOpacity style={styles.proceedButton}>
              <Text style={styles.buttonText}>Concluir Compra</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'lightgray',
    marginBottom: 20
  },
  itemImage: {
    width: 70,
    height: 70,
    marginRight: 10,
    borderRadius: 35
  },
  titleContainer: {
    flex: 1,
    marginHorizontal: 10
  },
  itemTitle: {
    marginRight: 10,
    fontWeight: 'bold'
  },
  deleteButton: {
    marginLeft: 10,
    padding: 10,
    borderRadius: 2,
    backgroundColor: 'lightgray'
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    margin: 10
  },
  proceedButton: {
    padding: 15,
    backgroundColor: 'tomato',
    alignItems: 'center',
    margin: 10,
    borderRadius: 8
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase'
  }
})

export default CartScreen
