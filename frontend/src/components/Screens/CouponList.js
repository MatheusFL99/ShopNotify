import React from 'react'
import { View, Text, Image, FlatList } from 'react-native'

const CouponList = () => {
  const couponData = [
    {
      id: '1',
      available: true,
      expirationDate: '2023-07-15',
      store: 'Exemplo Store'
    },
    {
      id: '2',
      available: true,
      expirationDate: '2023-08-15',
      store: 'Exemplo Store'
    },
    {
      id: '3',
      available: true,
      expirationDate: '2023-08-30',
      store: 'Exemplo Store'
    },
    {
      id: '4',
      available: false,
      expirationDate: '2023-02-31',
      store: 'Exemplo Store 4'
    },
    {
      id: '5',
      available: true,
      expirationDate: '2023-11-30',
      store: 'Exemplo Store 5'
    },
    {
      id: '6',
      available: true,
      expirationDate: '2023-12-31',
      store: 'Exemplo Store 5'
    },
    {
      id: '7',
      available: false,
      expirationDate: '2023-03-12',
      store: 'Exemplo Store 7'
    },
    {
      id: '8',
      available: true,
      expirationDate: '2024-02-28',
      store: 'Exemplo Store 8'
    },
    {
      id: '9',
      available: true,
      expirationDate: '2024-03-31',
      store: 'Exemplo Store 9'
    },
    {
      id: '10',
      available: false,
      expirationDate: '2023-04-20',
      store: 'Exemplo Store 9'
    },
    {
      id: '11',
      available: true,
      expirationDate: '2024-05-31',
      store: 'Exemplo Store 11'
    },
    {
      id: '12',
      available: true,
      expirationDate: '2024-06-30',
      store: 'Exemplo Store 12'
    }

    // depois puxar do backend
  ]

  const renderCouponItem = ({ item }) => {
    const statusColor = item.available ? 'green' : 'red'

    return (
      <View className="flex-row p-4">
        <View className="flex-1">
          <Text className={`font-bold text-${statusColor}`}>
            Loja: {item.store}
          </Text>
          <Text className={`text-${statusColor}`}>
            Data de validade: {item.expirationDate}
          </Text>
          <Text className={`text-${statusColor}`}>
            Status: {item.available ? 'Disponível' : 'Indisponível'}
          </Text>
        </View>
        {item.available && (
          <Image
            source={require('../../../assets/QRCode.png')}
            className="w-12 h-12"
          />
        )}
      </View>
    )
  }

  return (
    <FlatList
      data={couponData}
      keyExtractor={item => item.id}
      renderItem={renderCouponItem}
      inverted={true}
    />
  )
}

export default CouponList
