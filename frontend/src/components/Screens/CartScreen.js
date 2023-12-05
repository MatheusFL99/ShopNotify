import React, { useContext, useCallback, useState } from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  RefreshControl,
  Modal
} from 'react-native'
import axios from 'axios'
import defaultUrl from '../../utils/defaultUrl'
import { AuthContext } from '../../context/AuthContext'
import { useFocusEffect } from '@react-navigation/native'

const CartScreen = ({ navigation }) => {
  const defaultURL = defaultUrl()
  const [modalVisible, setModalVisible] = useState(false)
  const [itemqntt, setItemqntt] = useState(1)
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
      console.error('Erro ao carregar carrinho:', err.response.data.message)
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

  if (cart.length === 0) {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Text>O seu carrinho está vazio.</Text>
      </View>
    )
  }

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.titleContainer}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemTitle}>
          {item.title}
        </Text>
        <Text>{item.store.name}</Text>
        <Text>
          {item.finalPrice.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          })}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => removeItem(item._id)}
      >
        <Text style={styles.cancelText}>Remover</Text>
      </TouchableOpacity>
    </View>
  )

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
                colors={['red']}
              />
            }
          />
          <View style={styles.footer}>
            <Text style={styles.totalText}>
              Total:{' '}
              {valorTotal.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })}
            </Text>
            <TouchableOpacity
              style={styles.proceedButton}
              onPress={() =>
                navigation.navigate('Pagar no aplicativo', { valorTotal })
              }
            >
              <Text style={styles.buttonText}>Concluir Compra</Text>
            </TouchableOpacity>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  Escolha o método de pagamento
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(!modalVisible)
                      navigation.navigate('Pagar no aplicativo', { valorTotal })
                    }}
                  >
                    <Text style={styles.modalButtons}>
                      Pagar pelo aplicativo
                    </Text>
                  </TouchableOpacity>
                  {/* <TouchableOpacity>
                    <Text style={styles.modalButtons}>
                      Pagar direto no local
                    </Text>
                  </TouchableOpacity> */}
                </View>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                    setModalVisible(!modalVisible)
                  }}
                >
                  <Text style={styles.cancelText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
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
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  quantityButton: {
    width: 20,
    height: 20,
    backgroundColor: 'lightgray',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5
  },
  deleteButton: {
    marginLeft: 10,
    padding: 10,
    borderRadius: 2,
    backgroundColor: 'lightgray'
  },
  footer: {
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,

    borderTopWidth: 0.5,
    borderTopColor: 'lightgray'
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10
  },
  proceedButton: {
    padding: 15,
    backgroundColor: 'red',
    alignItems: 'center',
    margin: 10,
    borderRadius: 8
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase'
  },
  modalButtons: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  },
  cancelButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'red',
    padding: 10,
    borderRadius: 8
  },
  cancelText: {
    minHeight: 20,
    minWidth: 70,
    color: 'red',
    textAlign: 'center'
  }
})

export default CartScreen
