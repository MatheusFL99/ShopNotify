import React, { useContext, useState } from 'react'
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native'
import axios from 'axios'
import defaultUrl from '../../utils/defaultUrl'
import { AuthContext } from '../../context/AuthContext'

const PurchaseInAppScreen = ({ navigation, route }) => {
  const [cardNumber, setCardNumber] = useState('')
  const [cardName, setCardName] = useState('')
  const [cardExpiration, setCardExpiration] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const defaultURL = defaultUrl()
  const { valorTotal } = route.params
  const { userToken } = useContext(AuthContext)

  const checkout = async () => {
    try {
      const response = await axios.post(
        `${defaultURL}/purchases/finalizepurchaseapp`,
        {
          total: valorTotal
        },
        {
          headers: {
            authorization: `Bearer ${userToken}`
          }
        }
      )

      if (response.status === 200) {
        Alert.alert('Success', 'Compra finalizada com sucesso')
        navigation.navigate('Minhas compras')
      }
    } catch (err) {
      Alert.alert('Erro', 'Erro ao finalizar compra')
      console.log('Erro ao finalizar compra', err.response.data.message)
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Finalizar Compra</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Número do cartão</Text>
        <TextInput
          style={styles.input}
          placeholder="Número do cartão"
          value={cardNumber}
          onChangeText={setCardNumber}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome do titular</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome do titular"
          value={cardName}
          onChangeText={setCardName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Validade</Text>
        <TextInput
          style={styles.input}
          placeholder="Data de validade do cartão"
          value={cardExpiration}
          onChangeText={setCardExpiration}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Digitos de segurança</Text>
        <TextInput
          style={styles.input}
          placeholder="CVV"
          value={cardCvv}
          onChangeText={setCardCvv}
        />
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.navigate('Carrinho')}
        >
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton} onPress={checkout}>
          <Text style={styles.saveText}>Finalizar compra</Text>
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
  saveText: {
    minHeight: 20,
    minWidth: 100,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center'
  }
})

export default PurchaseInAppScreen
