import React, { useState } from 'react'
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'

const LoginUser = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    // Lógica de autenticação aqui
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
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color="white"
          style={styles.goBackIcon}
        />
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log('Não possui cadastro')}>
        <Text style={styles.registerText}>
          Não possui cadastro? Clique aqui!
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
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: 'white'
  },
  inputIcon: {
    marginRight: 10
  },
  input: {
    flex: 1,
    height: 40
  },
  loginButton: {
    backgroundColor: '#2196f3',
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10
  },
  goBackButton: {
    flexDirection: 'row',
    backgroundColor: '#888',
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
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
    color: '#888',
    fontSize: 14,
    marginTop: 10
  }
})

export default LoginUser
