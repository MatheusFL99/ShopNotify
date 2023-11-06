import React, { useState, useContext, useCallback } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  StyleSheet
} from 'react-native'
import axios from 'axios'
import { useFocusEffect } from '@react-navigation/native'
import { AuthContext } from '../../../context/AuthContext'
import defaultUrl from '../../../utils/defaultUrl'

const MyPaymentMethodsScreen = ({ navigation }) => {
  const [paymentMethods, setPaymentMethods] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const defaultURL = defaultUrl()
  const { userToken } = useContext(AuthContext)

  const fetchUserPaymentMethods = async () => {
    try {
      const response = axios.get(
        `${defaultURL}/paymentmethod/mypaymentmethods`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        }
      )
      const data = response.data
      setPaymentMethods(data)
    } catch (err) {
      console.error(
        'Erro ao resgatar métodos de pagamento do usuário',
        err.message
      )
    } finally {
      setRefreshing(false)
    }
  }

  const handleRefresh = () => {
    setRefreshing(true)
    fetchUserPaymentMethods()
  }

  useFocusEffect(
    useCallback(() => {
      handleRefresh()
    }, [userToken])
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.addButton}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
          Métodos de pagamento
        </Text>
        <TouchableOpacity style={styles.addIcon}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.flatListStyle}
        data={paymentMethods}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => editAddressHandler(item._id)}
            style={styles.item}
          >
            <View style={styles.textContainer}>
              <Text style={styles.itemText}>{item.cardNumber}</Text>
              <Text style={styles.itemDescription}>{item.cardName}</Text>
            </View>
          </TouchableOpacity>
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#F00']}
          />
        }
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  addButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 20
  },
  addIcon: {
    width: 30,
    height: 30,
    backgroundColor: '#CCC',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  flatListStyle: {
    backgroundColor: '#FFF'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#CCC'
  },
  textContainer: {
    flex: 1,
    marginLeft: 20
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  itemDescription: {
    fontSize: 14,
    color: '#CCC'
  }
})

export default MyPaymentMethodsScreen
