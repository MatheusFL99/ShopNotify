import React, { useState, useContext } from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native'
import axios from 'axios'
import defaultUrl from '../../../utils/defaultUrl'
import { AuthContext } from '../../../context/AuthContext'

const AddProductScreen = ({ navigation }) => {
  const { storeToken } = useContext(AuthContext)
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [discount, setDiscount] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState('')
  const defaultURL = defaultUrl()

  const createProduct = async () => {
    try {
      const response = await axios.post(
        `${defaultURL}/products/create`,
        {
          title: title,
          price: price,
          discount: discount,
          description: description,
          category: category,
          image: image
        },
        {
          headers: {
            Authorization: `Bearer ${storeToken}`
          }
        }
      )

      if (response.status === 200) {
        Alert.alert('Success', 'Produto adicionado com sucesso!')
        navigation.navigate('Meus Produtos')
        console.log(response.data)
      }
    } catch (error) {
      console.error('Error creating product:', error)
      Alert.alert('Error', 'Erro ao atualizar o produto.')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Product Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o título do produto"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Product Price</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o preço original do produto"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Product Discount</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a porcentagem de desconto"
        value={discount}
        onChangeText={setDiscount}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Product Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a descrição do produto"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Product Category</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a categoria do produto"
        value={category}
        onChangeText={setCategory}
      />

      <Text style={styles.label}>Product Image</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o URL da imagem do produto"
        value={image}
        onChangeText={setImage}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.navigate('Meus Produtos')}
        >
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.createButton} onPress={createProduct}>
          <Text style={styles.buttonText}>Adicionar Produto</Text>
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
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8
  },
  createButton: {
    backgroundColor: '#836FFF',
    padding: 10,
    borderRadius: 8
  },
  buttonText: {
    minHeight: 20,
    minWidth: 100,
    color: '#fff',
    textAlign: 'center'
  }
})

export default AddProductScreen
