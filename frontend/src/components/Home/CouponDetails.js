import React from 'react'
import { View, Text } from 'react-native'

const DetalhesCuponScreen = ({ route }) => {
  const { cupon } = route.params

  return (
    <View style={styles.container}>
      <Text style={styles.cuponTitle}>{cupon.title}</Text>
      <Text style={styles.cuponPercentage}>{cupon.percentage}</Text>
      <Text style={styles.cuponExpirationDate}>{cupon.expirationDate}</Text>
      <Text style={styles.cuponStore}>{cupon.store}</Text>
    </View>
  )
}

const styles = {
  container: {
    flex: 1,
    padding: 20
  },
  cuponTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  cuponPercentage: {
    fontSize: 18
  },
  cuponExpirationDate: {
    fontSize: 16,
    marginTop: 10
  },
  cuponStore: {
    fontSize: 16,
    marginTop: 10
  }
}

export default DetalhesCuponScreen
