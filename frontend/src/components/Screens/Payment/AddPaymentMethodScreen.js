import React, { useContext, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView
} from 'react-native'
import { AuthContext } from '../../../context/AuthContext'
import defaultUrl from '../../../utils/defaultUrl'
import axios from 'axios'

const AddPaymentMethodScreen = ({ navigation }) => {
  const { userToken } = useContext(AuthContext)
  const defaultURL = defaultUrl()
  const [paymentName, setPaymentName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [cvv, setCvv] = useState('')
  const [expirationDate, setExpirationDate] = useState('')
  const [titularName, setTitularName] = useState('')

  const createPaymentMethod = async () => {
    try {
      const response = await axios.post(
        `${defaultURL}/paymentmethod/add`,
        {
          paymentName: paymentName,
          cardNumber: cardNumber,
          cvv: cvv,
          expirationDate: expirationDate,
          titularName: titularName
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        }
      )
      if (response.status === 200) {
        Alert.alert('Success', 'Método de pagamento adicionado com sucesso')
        navigation.navigate('Pagamentos')
      }
    } catch (err) {
      console.error('Erro ao adicionar método de pagamento', err)
      Alert.alert('Erro', 'Erro ao adicionar método de pagamento')
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Apelido do cartão:</Text>
        <TextInput
          style={styles.input}
          value={paymentName}
          onChangeText={setPaymentName}
          placeholder="Apelido do cartão (ex: crédito visa)"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Número do cartão:</Text>
        <TextInput
          style={styles.input}
          value={cardNumber}
          onChangeText={setCardNumber}
          placeholder="Número do cartão"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Digitos de seguraça:</Text>
        <TextInput
          style={styles.input}
          value={cvv}
          onChangeText={setCvv}
          placeholder="CVV"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Data de expiração:</Text>
        <TextInput
          style={styles.input}
          value={expirationDate}
          onChangeText={setExpirationDate}
          placeholder="Data de expiração"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome do titular:</Text>
        <TextInput
          style={styles.input}
          value={titularName}
          onChangeText={setTitularName}
          placeholder="Nome do titular"
        />
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.navigate('Pagamentos')}
        >
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={createPaymentMethod}
          disabled={
            !paymentName ||
            !cardNumber ||
            !cvv ||
            !expirationDate ||
            !titularName
          }
        >
          <Text style={styles.saveText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
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
  buttonsContainer: {
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
  saveButtonDisable: {
    backgroundColor: 'gray',
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

export default AddPaymentMethodScreen
