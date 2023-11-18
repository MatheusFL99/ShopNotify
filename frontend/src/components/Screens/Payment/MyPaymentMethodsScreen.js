import React, { useState, useContext, useCallback } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  StyleSheet,
  Alert
} from 'react-native'
import axios from 'axios'
import { useFocusEffect } from '@react-navigation/native'
import { AuthContext } from '../../../context/AuthContext'
import defaultUrl from '../../../utils/defaultUrl'
import Icon from 'react-native-vector-icons/FontAwesome'

const MyPaymentMethodsScreen = ({ navigation }) => {
  const [paymentMethods, setPaymentMethods] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const defaultURL = defaultUrl()
  const { userToken } = useContext(AuthContext)

  const fetchUserPaymentMethods = async () => {
    try {
      const response = await axios.get(
        `${defaultURL}/paymentmethod/mypaymentmethods`,
        {
          headers: {
            authorization: `Bearer ${userToken}`
          }
        }
      )
      setPaymentMethods(response.data)
    } catch (err) {
      console.error(
        'Erro ao resgatar métodos de pagamento do usuário',
        err.message
      )
    } finally {
      setRefreshing(false)
    }
  }

  const handleAddPaymentMethod = () => {
    navigation.navigate('Adicionar forma de pagamento')
  }

  const deletePaymentMethod = async paymentId => {
    const response = await axios.delete(
      `${defaultURL}/paymentmethod/delete/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      }
    )

    if (response.status === 200) {
      Alert.alert('Sucesso', 'Método de pagamento deletado com sucesso')
      handleRefresh()
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
        <TouchableOpacity
          style={styles.addIcon}
          onPress={handleAddPaymentMethod}
        >
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.flatListStyle}
        data={paymentMethods}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.textContainer}>
              <Text style={styles.itemText}>{item.titularName}</Text>
              <Text style={styles.itemText}>{item.cardNumber}</Text>
              <Text style={styles.itemDescription}>{item.paymentName}</Text>
            </View>
            <TouchableOpacity
              onPress={() => deletePaymentMethod(item._id)}
              style={styles.deleteButton}
            >
              <Icon name="trash" size={24} color="#333" />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item._id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['red']}
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
    padding: 25,
    marginVertical: 10,
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1
  },
  textContainer: {
    flex: 1,
    marginLeft: 20
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  itemDescription: {
    fontSize: 14,
    color: '#CCC',
    color: '#666'
  },
  deleteButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default MyPaymentMethodsScreen
