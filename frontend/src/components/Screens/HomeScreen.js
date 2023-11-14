import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList
} from 'react-native'
import axios from 'axios'
import defaultUrl from '../../utils/defaultUrl'

const categories = [
  {
    name: 'Computação',
    icon: require('../../../assets/images/TesteComputador.png')
  },
  { name: 'Moda', icon: require('../../../assets/images/testeModa.png') },
  { name: 'Eletronicos', icon: require('../../../assets/images/teste8.png') },
  {
    name: 'Beleza',
    icon: require('../../../assets/images/testeMaquiagem.png')
  },
  { name: 'Casa', icon: require('../../../assets/images/TesteCasa.png') }
]

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([])
  const defaultURL = defaultUrl()
  const [refreshing, setRefreshing] = useState(false)

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${defaultURL}/products/list`)
      setProducts(response.data)
      console.log(response.data)
    } catch (error) {
      console.error('Erro ao buscar os produtos:', error)
    } finally {
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const latestProduct = products.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )[0]
  const navigateToSearchWithCategory = categoryName => {
    navigation.navigate('Pesquisar', { categoryName })
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.mapSection}>
        <TouchableOpacity
          style={styles.titleMap}
          onPress={() => navigation.navigate('MapComponent')}
        >
          <Image
            source={require('../../../assets/images/Mapa.png')}
            style={styles.mapThumbnail}
          />
        </TouchableOpacity>
        <Text>Sua localização no mapa pode variar!</Text>
      </View>

      <View style={styles.categoriesSection}>
        <FlatList
          horizontal
          data={categories}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.categoryItem}
              onPress={() => navigateToSearchWithCategory(item.title)}
            >
              <Image source={item.icon} style={styles.categoryIcon} />
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesSection}
        />
      </View>

      <View style={styles.offersSection}>
        <Text style={styles.offersTitle}>Oferta do Dia</Text>
        {latestProduct && (
          <TouchableOpacity style={styles.offerItem}>
            <Text style={styles.offerText}>
              {latestProduct.discount}% de desconto
            </Text>
            <Image
              source={{ uri: latestProduct.image }}
              style={styles.offerImage}
            />
            <Text style={styles.offerExpiration}>{latestProduct.title}</Text>
            <Text style={styles.offersTitle}>
              {latestProduct.finalPrice.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })}{' '}
            </Text>
            <TouchableOpacity style={styles.offerButton}>
              <Text style={styles.offerButtonText}>Adicionar ao carrinho</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        {/* Repita para outras ofertas */}
      </View>
    </ScrollView>
  )
}

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  mapSection: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleMap: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  mapThumbnail: {
    width: windowWidth - 40, // subtracting the padding
    height: windowHeight * 0.3, // 30% of the window height
    borderRadius: 10
  },
  categoryItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10
  },
  categoryIcon: {
    width: 50,
    height: 50,
    marginBottom: 5
  },
  offersSection: {
    padding: 20
  },
  offersTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15
  },
  offerItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6
  },
  offerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  offerImage: {
    width: '100%',
    height: windowHeight * 0.2,
    borderRadius: 8,
    marginBottom: 10
  },
  offerExpiration: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 10
  },
  offerButton: {
    backgroundColor: '#ff5252',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center'
  },
  offerButtonText: {
    color: '#ffffff',
    fontWeight: 'bold'
  }
})

export default HomeScreen
