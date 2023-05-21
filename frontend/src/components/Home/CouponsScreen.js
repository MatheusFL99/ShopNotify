import React from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'

const CuponsScreen = ({ navigation }) => {
  const cupons = [
    {
      id: 1,
      title: 'Cupom 1',
      percentage: '10%',
      expirationDate: '30/06/2023',
      store: 'Loja 1'
    },
    {
      id: 2,
      title: 'Cupom 2',
      percentage: '20%',
      expirationDate: '15/07/2023',
      store: 'Loja 2'
    }
  ]

  const renderCuponItem = ({ item }) => (
    <TouchableOpacity
      style={styles.cuponItemContainer}
      onPress={() => navigation.navigate('DetalhesCupon', { cupon: item })}
    >
      <Text style={styles.cuponItemTitle}>{item.title}</Text>
      <Text style={styles.cuponItemPercentage}>{item.percentage}</Text>
      <Text style={styles.cuponItemExpirationDate}>{item.expirationDate}</Text>
      <Text style={styles.cuponItemStore}>{item.store}</Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={cupons}
        renderItem={renderCuponItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  )
}

const styles = {
  container: {
    flex: 1,
    padding: 20
  },
  cuponItemContainer: {
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  },
  cuponItemTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  cuponItemPercentage: {
    fontSize: 16
  },
  cuponItemExpirationDate: {
    fontSize: 14,
    marginTop: 5
  },
  cuponItemStore: {
    fontSize: 14,
    marginTop: 5
  }
}

export default CuponsScreen
