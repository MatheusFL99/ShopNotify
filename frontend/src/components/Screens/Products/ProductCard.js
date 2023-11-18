import React, { useState, useContext, useCallback } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
  StyleSheet
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { AuthContext } from '../../../context/AuthContext'
import axios from 'axios'
import defaultUrl from '../../../utils/defaultUrl'
import { useFocusEffect } from '@react-navigation/native'

const ProductCard = ({
  image,
  category,
  title,
  price,
  finalPrice,
  discount,
  description,
  store,
  _id,
  isFavorite
}) => {
  const defaultURL = defaultUrl()
  const formattedPrice = price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
  const formattedPriceFinal = finalPrice.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })

  const [modalVisible, setModalVisible] = useState(false)
  const [cupomResgatado, setCupomResgatado] = useState(false)
  const [favorited, setFavorited] = useState(isFavorite)
  const { userToken } = useContext(AuthContext)

  const checkIfFavorited = async () => {
    const productId = _id
    await axios
      .get(`${defaultURL}/products/favorites`, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
      .then(res => {
        const favorites = res.data
        const isFavorited = favorites.find(
          favorite => favorite._id === productId
        )
        if (isFavorited) {
          setFavorited(true)
        } else {
          setFavorited(false)
        }
      })
      .catch(err => {
        console.log(err.response.data)
      })
  }

  const addtofavorites = async (_id, userToken) => {
    const productId = _id
    await axios
      .put(
        `${defaultURL}/products/addtofavorites`,
        {
          productId: productId
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        }
      )
      .then(res => {
        console.log('Produto adicionado aos favoritos!')
        setFavorited(true)
      })
      .catch(err => {
        console.log(err.response.data)
      })
  }

  const removefromfavorites = async (_id, userToken) => {
    const productId = _id
    await axios
      .put(
        `${defaultURL}/products/removefavorite`,
        {
          productId: productId
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        }
      )
      .then(res => {
        console.log('Produto removido dos favoritos!')
        setFavorited(false)
      })
      .catch(err => {
        console.log(err.response.data)
      })
  }

  const addToCart = async () => {
    const productId = _id
    await axios
      .put(
        `${defaultURL}/purchases/addtocart`,
        {
          productId: productId
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        }
      )
      .then(res => {
        console.log('Produto adicionado ao carrinho!')
        Alert.alert('Produto adicionado ao carrinho!')
      })
      .catch(err => {
        console.log(err.response.data)
      })
  }

  useFocusEffect(
    useCallback(() => {
      checkIfFavorited()
    }, [userToken])
  )

  const closeModal = () => {
    setModalVisible(false)
  }

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: image }}
          className={'w-full h-72'}
          style={styles.productImage}
        />
        {discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{discount}% OFF</Text>
          </View>
        )}
      </View>
      <View style={styles.storeCategoryContainer}>
        <Text style={styles.storeCategoryText}>
          {store.name} - {category}
        </Text>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.originalPriceText}>{formattedPrice}</Text>
        <View style={styles.priceContainer}>
          <View style={styles.finalPriceText}>
            <Text className="text-3xl text-green font-extrabold dark:text-white">
              {formattedPriceFinal}
            </Text>
          </View>
        </View>
        <Text numberOfLines={2} style={styles.descriptionText}>
          {description}
        </Text>
        <TouchableOpacity
          onPress={addToCart}
          style={[
            styles.addToCartButton,
            cupomResgatado && styles.cupomResgatado
          ]}
        >
          {cupomResgatado ? (
            <View style={styles.cupomInfoContainer}>
              <Text style={styles.cupomText}>Cupom resgatado</Text>
              <Ionicons
                name="ios-checkmark-outline"
                size={20}
                color="white"
                style={styles.checkmarkIcon}
              />
            </View>
          ) : (
            <Text style={styles.addToCartText}>Adicionar ao carrinho</Text>
          )}
        </TouchableOpacity>

        {favorited ? (
          <TouchableOpacity
            onPress={() => removefromfavorites(_id, userToken)}
            style={styles.favoritedButton}
          >
            <Ionicons name={'star'} size={25} color={'yellow'} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => addtofavorites(_id, userToken)}
            style={styles.favoriteButton}
          >
            <Ionicons name={'star-outline'} size={25} color={'black'} />
          </TouchableOpacity>
        )}
      </View>

      {/* Modal do QRCode */}
      <Modal visible={modalVisible} animationType="slide">
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text>Produto adicionado ao carrinho!{'\n'}</Text>
          <View style={{}}>
            <TouchableOpacity onPress={closeModal} style={{ marginTop: 20 }}>
              <Text style={{ color: 'blue' }}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: 20 }}>
              <Text> Ver carrinho</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6
  },
  imageContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    position: 'relative'
  },
  productImage: {
    width: '100%',
    height: 288,
    resizeMode: 'contain'
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    right: 8
  },
  discountText: {
    backgroundColor: 'green',
    borderRadius: 9999,
    padding: 12,
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold'
  },
  storeCategoryContainer: {
    marginTop: 20
  },
  storeCategoryText: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.6)',
    fontWeight: 'normal'
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black'
  },
  originalPriceText: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    color: 'black',
    opacity: 0.7
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12
  },
  finalPriceText: {
    fontSize: 24,
    color: 'green',
    fontWeight: '800'
  },
  descriptionText: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.6)'
  },
  addToCartButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 9999,
    padding: 12,
    width: '83.333%', // 10/12 in percentage
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: 'black'
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  },
  cupomResgatado: {
    backgroundColor: 'gray'
  },
  cupomInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  cupomText: {
    color: 'white',
    fontWeight: 'bold'
  },
  checkmarkIcon: {
    marginLeft: 5
  },
  favoritedButton: {
    alignSelf: 'flex-end',
    marginTop: 5
  },
  favoriteButton: {
    alignSelf: 'flex-end',
    marginTop: 5
  }
})

export default ProductCard
