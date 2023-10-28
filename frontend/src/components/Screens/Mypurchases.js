import React, { useState, useEffect, useContext } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native'
import axios from 'axios'
import defaultUrl from '../../utils/defaultUrl'
import { AuthContext } from '../../context/AuthContext'
import { FontAwesome } from '@expo/vector-icons'

const PurchaseHistory = () => {
  const [purchases, setPurchases] = useState([])
  const defaultURL = defaultUrl()
  const { userToken } = useContext(AuthContext)

  const fetchPurchases = async () => {
    try {
      const response = await axios.get(`${defaultURL}/purchases/mypurchases`, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
      setPurchases(response.data)
    } catch (error) {
      console.error('Erro ao carregar histórico de compras:', error)
    }
  }

  useEffect(() => {
    fetchPurchases()
    console.log(purchases)
  }, [userToken])

  const renderPurchaseItem = ({ item: purchase }) => (
    <View style={styles.purchaseContainer}>
      <Text style={styles.dateText}>
        {new Date(purchase.date).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        })}
      </Text>

      <View style={styles.purchaseDetails}>
        <Image
          source={{
            uri: purchase.products[0].image || 'defaultProductImageUrl'
          }}
          style={styles.productImage}
        />

        <View style={styles.textContainer}>
          <Text style={styles.productName}>{purchase?.products[0]?.title}</Text>
          {purchase?.products?.length > 1 ? (
            <Text style={styles.moreProductsText}>
              +{purchase.products.length - 1} produto(s)
            </Text>
          ) : null}
          <Text>
            Total:{' '}
            {purchase?.products[0]?.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            })}
          </Text>

          <View style={styles.orderInfoContainer}>
            <FontAwesome name="check-circle" size={16} color="green" />
            <Text style={styles.orderInfo}>Compra concluída.</Text>
          </View>
        </View>
      </View>
    </View>
  )

  return (
    <FlatList
      data={purchases}
      renderItem={renderPurchaseItem}
      keyExtractor={purchase => purchase._id}
      style={styles.container}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingBottom: 20,
    marginBottom: 20,
    minHeight: '100%'
  },
  dateText: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10
  },
  purchaseContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8
  },
  purchaseDetails: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25
  },
  textContainer: {
    flex: 2
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 14
  },
  orderInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    marginBottom: 5,
    marginTop: 10
  },
  orderInfo: {
    fontSize: 14,
    color: 'gray',
    marginLeft: 5
  },
  moreProductsText: {
    fontSize: 10,
    color: 'green',
    marginBottom: 5
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1
  }
})
export default PurchaseHistory
