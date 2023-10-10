import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const WelcomePage = () => {
  const navigation = useNavigation()

  const handleEmailLogin = () => {
    navigation.navigate('Cadastro')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bem-vindo!</Text>
      <Text style={styles.loginText}>Escolha o método de login:</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleEmailLogin}>
          <Ionicons
            name="mail"
            size={24}
            color="white"
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>Entrar com CNPJ</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#836FFF'
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white'
  },
  loginText: {
    fontSize: 16,
    marginBottom: 10,
    color: 'white'
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 10
  },
  buttonIcon: {
    marginRight: 10
  },
  buttonText: {
    fontSize: 16,
    color: '#836FFF'
  }
})

export default WelcomePage
