import React, { useState, useEffect, useContext } from 'react'
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Text
} from 'react-native'
import axios from 'axios'
import { AuthContext } from '../../../context/AuthContext'
import defaultUrl from '../../../utils/defaultUrl'

const EditProductScreen = ({ route, navigation }) => {
  const { productId } = route.params
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [discount, setDiscount] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState('')
  const { storeToken } = useContext(AuthContext)
  const defaultURL = defaultUrl() // Assuming you have the defaultUrl utility

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `${defaultURL}/products/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${storeToken}`
            }
          }
        )
        const product = response.data
        setTitle(product.title)
        setPrice(product.price.toString())
        setDiscount(product.discount.toString())
        setDescription(product.description)
        setCategory(product.category)
        setImage(product.image)
      } catch (error) {
        console.error('Error fetching product details:', error)
      }
    }
    fetchProductDetails()
  }, [productId, storeToken])

  const saveHandler = async () => {
    try {
      const response = await axios.put(
        `${defaultURL}/products/edit/${productId}`,
        {
          title,
          price,
          discount,
          description,
          category,
          image
        },
        {
          headers: {
            Authorization: `Bearer ${storeToken}`
          }
        }
      )

      if (response.status === 200) {
        Alert.alert('Success', 'Produto atualizado com sucesso!')
        navigation.navigate('Meus Produtos')
        console.log(response.data)
      }
    } catch (error) {
      console.error('Error updating product:', error)
      Alert.alert('Error', 'Erro ao atualizar o produto.')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título do Produto</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
      />
      <Text style={styles.label}>Preço original do Produto</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        placeholder="Price"
        keyboardType="decimal-pad"
      />
      <Text style={styles.label}>Porcentagem de desconto do Produto</Text>
      <TextInput
        style={styles.input}
        value={discount}
        onChangeText={setDiscount}
        placeholder="Discount"
        keyboardType="decimal-pad"
      />
      <Text style={styles.label}>Descrição do Produto</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
      />
      <Text style={styles.label}>Categoria do Produto</Text>
      <TextInput
        style={styles.input}
        value={category}
        onChangeText={setCategory}
        placeholder="Category"
      />
      <Text style={styles.label}>URL da imagem do Produto</Text>
      <TextInput
        style={styles.input}
        value={image}
        onChangeText={setImage}
        placeholder="Image URL"
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.navigate('Meus Produtos')}
        >
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.createButton} onPress={saveHandler}>
          <Text style={styles.buttonText}>Salvar</Text>
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

export default EditProductScreen
