import React, { useState, useContext } from 'react'
import { View, Text, Image, TouchableOpacity, Modal } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { AuthContext } from '../../../context/AuthContext'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function ProductCard({
  image,
  category,
  title,
  price,
  discount,
  description,
  store,
  _id
}) {
  const FinalPrice = price - (price * discount) / 100
  const formattedPrice = price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
  const formattedPriceFinal = FinalPrice.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })

  const [modalVisible, setModalVisible] = useState(false)
  const [cupomResgatado, setCupomResgatado] = useState(false)
  const { userToken } = useContext(AuthContext)

  const reedemCoupon = async (_id, userToken) => {
    const productId = _id
    await axios
      .put(
        'http://192.168.15.117:5000/api/products/addtofavorites',
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
        setCupomResgatado(true)
        setModalVisible(true)
      })
      .catch(err => {
        console.log(err.response.data)
      })
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  const handleResgatarCupom = () => {
    setCupomResgatado(true)
    setModalVisible(true)
  }

  return (
    <View className={'w-full bg-white dark:bg-gray-50/10 rounded-3xl p-5 my-5'}>
      <View className="bg-white rounded-xl relative">
        <Image
          source={{ uri: image }}
          className={'w-full h-72'}
          style={{ resizeMode: 'contain' }}
        />
        {discount && (
          <View className="absolute top-2 right-2">
            <Text className="bg-green-500 rounded-full px-3 py-3 text-white text-s font-bold">
              {discount}% OFF
            </Text>
          </View>
        )}
      </View>
      <View className="mt-5">
        <Text className={'text-sm text-black/60 dark:text-white/70'}>
          {store.name} - {category}
        </Text>
        <Text className={'text-lg font-semibold dark:text-white'}>{title}</Text>
        <Text className={'text-1xl dark:text-white line-through'}>
          {formattedPrice}
        </Text>
        <View className={'flex-row justify-between items-center my-3'}>
          <View className={'flex-row items-center gap-3'}>
            <Text className="text-3xl text-green font-extrabold dark:text-white">
              {formattedPriceFinal}
            </Text>
          </View>
        </View>
        <Text
          numberOfLines={2}
          className={'text-sm text-black/60 dark:text-white/70'}
        >
          {description}
        </Text>
        <TouchableOpacity
          onPress={cupomResgatado ? null : () => reedemCoupon(_id, userToken)}
          className={`flex-row justify-center rounded-full ${
            cupomResgatado ? 'bg-gray-500' : 'bg-black/90 dark:bg-white/90'
          } p-3 w-10/12 self-center mt-5`}
        >
          {cupomResgatado ? (
            <View className="flex-row items-center">
              <Text className="text-white dark:text-black font-bold">
                Cupom resgatado
              </Text>
              <Ionicons
                name="ios-checkmark-outline"
                size={20}
                color="white"
                style={{ marginLeft: 5 }}
              />
            </View>
          ) : (
            <Text className="text-white dark:text-black font-bold">
              Resgatar Cupom
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Modal do QRCode */}
      <Modal visible={modalVisible} animationType="slide">
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Image
            source={require('../../../../assets/QRCode.png')}
            style={{ width: 200, height: 200 }}
          />
          <TouchableOpacity onPress={closeModal} style={{ marginTop: 20 }}>
            <Text style={{ color: 'blue' }}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
}
