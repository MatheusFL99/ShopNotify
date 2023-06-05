import React, { useContext, useState } from 'react'
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../../context/AuthContext'

const LoginUser = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation()
  const { login } = useContext(AuthContext)

  handleDontHaveAccount = () => {
    navigation.navigate('Cadastro')
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <MaterialIcons
          name="email"
          size={24}
          color="#888"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
        />
      </View>
      <View style={styles.inputContainer}>
        <MaterialIcons
          name="lock"
          size={24}
          color="#888"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />
      </View>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => login(email, password)}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDontHaveAccount}>
        <Text style={styles.registerText}>
          Não possui uma conta? <Text style={styles.click}>Clique aqui!</Text>
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10
  },
  inputIcon: {
    marginRight: 10
  },
  input: {
    flex: 1,
    height: 40
  },
  loginButton: {
    backgroundColor: '#f4511e',
    width: '100%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10
  },
  goBackButton: {
    backgroundColor: '#888',
    flexDirection: 'row',
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10
  },
  goBackIcon: {
    marginRight: 5
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  registerText: {
    fontSize: 16,
    marginTop: 20
  },
  click: {
    color: '#f4511e'
  }
})

export default LoginUser
