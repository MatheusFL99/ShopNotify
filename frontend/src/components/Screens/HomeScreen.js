import React, { useState, useCallback, useContext, useMemo } from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Alert,
  RefreshControl
} from 'react-native'
import axios from 'axios'
import { useFocusEffect } from '@react-navigation/native'
import defaultUrl from '../../utils/defaultUrl'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import { AuthContext } from '../../context/AuthContext'

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
  const [location, setLocation] = useState(null)
  const { userToken } = useContext(AuthContext)
  const defaultURL = defaultUrl()
  const [refreshing, setRefreshing] = useState(false)

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${defaultURL}/products/list`)
      setProducts(response.data.reverse())
    } catch (error) {
      console.error('Erro ao buscar os produtos:', error)
    } finally {
      setRefreshing(false)
    }
  }

  const handleLocationPermission = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync()
    if (granted) {
      const { coords } = await Location.getCurrentPositionAsync()
      setLocation(coords)
    }
  }

  const addToCart = async () => {
    const productId = latestProduct._id
    await axios
      .put(
        `${defaultURL}/purchases/addtocart`,
        {
          productId: productId
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        }
      )
      .then(res => {
        console.log('Produto adicionado ao carrinho!')
        Alert.alert('Produto adicionado ao carrinho!')
      })
      .catch(err => {
        console.log(err.response.data)
      })
  }

  handleRefresh = () => {
    setRefreshing(true)
    fetchProducts()
    handleLocationPermission()
    const subscription = Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Highest,
        timeInterval: 1000,
        distanceInterval: 1
      },
      newLocation => {
        setLocation(newLocation.coords)
      }
    )

    subscription.then(sub => sub.remove())
  }

  useFocusEffect(
    useCallback(() => {
      handleRefresh()
    }, [])
  )

  const latestProduct = useMemo(
    () => products.sort((a, b) => new Date(b.date) - new Date(a.date))[0],
    [products]
  )

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={['#ff5252']}
        />
      }
    >
      <View style={styles.mapSection}>
        {location ? (
          <View>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
              }}
            >
              <Marker
                coordinate={location}
                title="Você está aqui"
                description={`Latitude: ${location.latitude.toFixed(
                  4
                )}, Longitude: ${location.longitude.toFixed(4)}`}
              />
            </MapView>
          </View>
        ) : (
          <Text style={styles.loadingText}>Carregando mapa...</Text>
        )}
      </View>
      <Text style={styles.locationText}>
        Sua localização no mapa pode variar.
      </Text>

      <View style={styles.categoriesSection}>
        <FlatList
          horizontal
          data={categories}
          keyExtractor={item => item.name}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.categoryItem}
              onPress={() => navigation.navigate('Pesquisar')}
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
            <TouchableOpacity style={styles.offerButton} onPress={addToCart}>
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
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  map: {
    width: windowWidth * 0.99,
    height: windowHeight * 0.4,
    alignSelf: 'center',
    marginTop: 0,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  titleMap: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  mapThumbnail: {
    width: windowWidth - 40,
    height: windowHeight * 0.3,
    borderRadius: 10
  },
  locationText: {
    textAlign: 'center',
    color: '#888888',
    marginBottom: 20,
    fontSize: 12
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
    backgroundColor: 'red',
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
