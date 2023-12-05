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
  const { storeToken } = useContext(AuthContext)
  const defaultURL = defaultUrl()
  const [storeId, setStoreId] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const fetchStoreInfo = async () => {
    try {
      const response = await axios.get(`${defaultURL}/stores/checkstore`, {
        headers: {
          Authorization: `Bearer ${storeToken}`
        }
      })
      const store = response.data
      setStoreId(store._id)
      setName(store.name)
      setEmail(store.email)
      setPassword(store.password)
      setConfirmPassword(store.password)
    } catch (err) {
      console.error('Erro ao receber dados do usuário:', err.message)
    }
  }

  useEffect(() => {
    fetchStoreInfo()
  }, [storeId, storeToken])

  const saveHandler = async () => {
    try {
      const response = await axios.put(
        `${defaultURL}/stores/edit/${storeId}`,
        {
          name,
          email,
          password,
          confirmPassword
        },
        {
          headers: {
            Authorization: `Bearer ${storeToken}`
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
      Alert.alert('Error', 'Erro ao salvar dados da loja')
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Editar Perfil</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome da loja:</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholder="Digite o nome da sua loja"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email da loja:</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholder="Digite o email da loja"
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
          placeholder="Confirme sua senha"
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
    backgroundColor: '#836FFF',
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
