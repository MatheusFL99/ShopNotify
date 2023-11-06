import React, { useContext, useEffect, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native'
import { AuthContext } from '../../context/AuthContext'
import defaultUrl from '../../utils/defaultUrl'
import axios from 'axios'

const EditProfileScreen = ({ navigation }) => {
  const { userToken } = useContext(AuthContext)
  const defaultURL = defaultUrl()
  const [userId, setUserId] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`${defaultURL}/users/checkuser`, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
      const user = response.data
      setUserId(user._id)
      setName(user.name)
      setEmail(user.email)
      setPassword(user.password)
      setConfirmPassword(user.password)
    } catch (err) {
      console.error('Erro ao receber dados do usuário:', err.message)
    }
  }

  useEffect(() => {
    fetchUserInfo()
  }, [userId, userToken])

  const saveHandler = async () => {
    try {
      const response = await axios.put(
        `${defaultURL}/users/edit/${userId}`,
        {
          name,
          email,
          password,
          confirmPassword
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        }
      )
      if (response.status === 200) {
        Alert.alert('Sucess', 'Dados atualizados com sucesso!')
        navigation.goBack()
        console.log(response.data)
      }
    } catch (err) {
      console.error('Erro ao salvar dados do usuário:', err.message)
      Alert.alert('Error', 'Erro ao salvar dados do usuário')
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Editar Perfil</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome:</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholder="Digite seu nome"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholder="Digite seu email"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Senha:</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          placeholder="Digite sua senha"
          secureTextEntry={true}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirme sua senha:</Text>
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
          placeholder="Confirm your password"
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={saveHandler}>
        <Text style={styles.saveText}>Salvar</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f5f5f5'
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  inputContainer: {
    marginBottom: 15
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold'
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff'
  },
  saveButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8
  },
  saveText: {
    minHeight: 20,
    minWidth: 100,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center'
  }
})

export default EditProfileScreen
