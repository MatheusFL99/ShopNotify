import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

const RegisterUser = ({ navigation }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmpassword] = useState('')

  const handleRegister = async () => {
    try {
      const response = await fetch(
        'http://192.168.15.117:5000/api/users/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            confirmpassword: confirmpassword
          })
        }
      )

      if (!response.ok) {
        throw new Error('Registration failed')
      }

      const data = await response.json()
      console.log(data)
      navigation.navigate('Produtos')
    } catch (error) {
      console.log(error)
      setError('Registration failed')
    }
  }

  const handleHaveAccount = () => {
    navigation.navigate('Login')
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        onChangeText={setName}
        value={name}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
        onChangeText={setPassword}
        value={password}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar senha"
        secureTextEntry={true}
        onChangeText={setConfirmpassword}
        value={confirmpassword}
      />
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleHaveAccount}>
        <Text style={styles.linkText}>
          Já possui cadastro? <Text style={styles.click}>Clique aqui!</Text>
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default RegisterUser

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10
  },
  registerButton: {
    backgroundColor: '#f4511e',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  backButton: {
    color: '#f4511e',
    fontSize: 16,
    textDecorationLine: 'underline'
  },
  linkText: {
    fontSize: 16,
    marginTop: 20
  },
  click: {
    color: '#f4511e'
  }
})
