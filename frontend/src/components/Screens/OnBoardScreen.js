import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'

const OnBoardScreen = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/shntf1.png')}
        style={styles.image}
      />
      <Text style={styles.text}>ShopNotify</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Welcome')}
        >
          <Text style={styles.buttonText}>Começar!</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F80032',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20
  },
  text: {
    color: 'white',
    fontSize: 60,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 20,
    bottom: 100
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 125,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold'
  }
})

export default OnBoardScreen
