import React, { useState, useContext, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert
} from 'react-native'
import defaultUrl from '../../../utils/defaultUrl'
import { AuthContext } from '../../../context/AuthContext'
import axios from 'axios'

const EditAddressScreen = ({ route, navigation }) => {
  const { addressId } = route.params
  const [name, setName] = useState('')
  const [streetaddress, setStreetaddress] = useState('')
  const [complement, setComplement] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zipcode, setZipcode] = useState('')
  const [country, setCountry] = useState('')
  const defaultURL = defaultUrl()
  const { userToken } = useContext(AuthContext)

  const fetchAddressDetails = async () => {
    try {
      const response = await axios.get(`${defaultURL}/address/${addressId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
      const data = response.data
      setName(data.name)
      setStreetaddress(data.streetaddress)
      setComplement(data.complement)
      setCity(data.city)
      setState(data.state)
      setZipcode(data.zipcode)
      setCountry(data.country)
    } catch (err) {
      console.error('Erro ao resgatar dados do endereço', err.message)
    }
  }

  const saveHandler = async () => {
    try {
      const respnse = await axios.put(
        `${defaultURL}/address/edit/${addressId}`,
        {
          name,
          streetaddress,
          complement,
          city,
          state,
          zipcode,
          country
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        }
      )
      if (respnse.status == 200) {
        Alert.alert('Sucess', 'Endereço atualizado com sucesso!')
        navigation.navigate('Endereços')
        console.log(respnse.data)
      }
    } catch (err) {
      console.error('Erro ao atualizar endereço', err.response.data.message)
      Alert.alert('Erro', err.response.data.message)
    }
  }

  useEffect(() => {
    fetchAddressDetails()
  }, [addressId, userToken])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nome do endereço</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.title}>Endereço</Text>
      <TextInput
        style={styles.input}
        placeholder="Endereço"
        value={streetaddress}
        onChangeText={setStreetaddress}
      />
      <Text style={styles.title}>Complemento</Text>
      <TextInput
        style={styles.input}
        placeholder="Complemento"
        value={complement}
        onChangeText={setComplement}
      />
      <Text style={styles.title}>Cidade</Text>
      <TextInput
        style={styles.input}
        placeholder="Cidade"
        value={city}
        onChangeText={setCity}
      />
      <Text style={styles.title}>Estado</Text>
      <TextInput
        style={styles.input}
        placeholder="Estado"
        value={state}
        onChangeText={setState}
      />
      <Text style={styles.title}>CEP</Text>
      <TextInput
        style={styles.input}
        placeholder="CEP"
        value={zipcode}
        onChangeText={setZipcode}
      />
      <Text style={styles.title}>País</Text>
      <TextInput
        style={styles.input}
        placeholder="País"
        value={country}
        onChangeText={setCountry}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.navigate('Endereços')}
        >
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={saveHandler}>
          <Text style={styles.saveText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 16
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  cancelButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'red',
    padding: 10,
    borderRadius: 8
  },
  cancelText: {
    minHeight: 20,
    minWidth: 100,
    color: 'red',
    textAlign: 'center'
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

export default EditAddressScreen
