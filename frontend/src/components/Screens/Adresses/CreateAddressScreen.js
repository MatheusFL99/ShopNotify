import React, { useContext, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView
} from 'react-native'
import { AuthContext } from '../../../context/AuthContext'
import defaultUrl from '../../../utils/defaultUrl'
import { TextInput } from 'react-native-gesture-handler'
import axios from 'axios'

const CreateAddressScreen = ({ navigation }) => {
  const { userToken } = useContext(AuthContext)
  const [name, setName] = useState('')
  const [streetaddress, setStreetaddress] = useState('')
  const [complement, setComplement] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zipcode, setZipcode] = useState('')
  const [country, setCountry] = useState('')
  const defaultURL = defaultUrl()

  const createAddress = async () => {
    try {
      const response = await axios.post(
        `${defaultURL}/address/create`,
        {
          name: name,
          streetaddress: streetaddress,
          complement: complement,
          city: city,
          state: state,
          zipcode: zipcode,
          country: country
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        }
      )
      if (response.status === 200) {
        Alert.alert('Success', 'Endereço adicionado com sucesso')
        navigation.navigate('Endereços')
      }
    } catch (err) {
      console.error('Erro ao adicionar endereço', err.message)
      Alert.alert('Erro', 'Erro ao adicionar endereço')
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Adicionar Endereço</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome:</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholder="Digite o nome do endereço (ex: Casa, Trabalho)"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Rua:</Text>
        <TextInput
          value={streetaddress}
          onChangeText={setStreetaddress}
          style={styles.input}
          placeholder="Digite o nome da rua"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Complemento</Text>
        <TextInput
          value={complement}
          onChangeText={setComplement}
          style={styles.input}
          placeholder="Digite o complemento se houver (ex: Apto 101, Bloco 2)"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Cidade</Text>
        <TextInput
          value={city}
          onChangeText={setCity}
          style={styles.input}
          placeholder="Digite o nome da cidade"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Estado</Text>
        <TextInput
          value={state}
          onChangeText={setState}
          style={styles.input}
          placeholder="Digite a sigla do estado (ex: SP, RJ)"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>CEP</Text>
        <TextInput
          value={zipcode}
          onChangeText={setZipcode}
          style={styles.input}
          placeholder="Digite o CEP"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>País</Text>
        <TextInput
          value={country}
          onChangeText={setCountry}
          style={styles.input}
          placeholder="Digite o nome do país"
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={createAddress}>
        <Text style={styles.saveButtonText}>Salvar</Text>
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
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5
  },
  saveButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  }
})

export default CreateAddressScreen
