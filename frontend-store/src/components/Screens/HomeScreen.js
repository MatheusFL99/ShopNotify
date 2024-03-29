import React, { useEffect, useState, useCallback, useContext } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList
} from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import axios from 'axios'
import { useFocusEffect } from '@react-navigation/native'
import { AuthContext } from '../../context/AuthContext'
import defaultUrl from '../../utils/defaultUrl'

const HomeScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null)
  const [products, setProducts] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const { storeToken } = useContext(AuthContext)
  const defaultURL = defaultUrl()

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${defaultURL}/products/myproducts`, {
        headers: {
          Authorization: `Bearer ${storeToken}`
        }
      })
      const data = response.data.reverse()
      console.log('Produtos carregados')
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setRefreshing(false)
    }
  }

  const handleRefresh = () => {
    setRefreshing(true)
    fetchProducts()
  }

  useFocusEffect(
    useCallback(() => {
      handleRefresh()
    }, [storeToken])
  )

  const handleLocationPermission = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync()
    if (granted) {
      const { coords } = await Location.getCurrentPositionAsync()
      setLocation(coords)
    }
  }

  useEffect(() => {
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

    return () => {
      subscription.then(sub => sub.remove())
    }
  })

  const handleTesteGeoLoc = () => {
    navigation.navigate('Teste geoloc')
  }

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Image source={{ uri: item.image }} style={styles.imagem} />
    </View>
  )

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
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
      <Text style={styles.title}>Meus Produtos</Text>
      <FlatList
        horizontal
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        showsHorizontalScrollIndicator={false}
        style={styles.flatList}
      />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    color: '#333'
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
  locationText: {
    textAlign: 'center',
    color: '#888888',
    marginBottom: 20,
    fontSize: 12
  },
  flatList: {
    paddingVertical: 10
  },
  productContainer: {
    alignItems: 'center',
    marginRight: 16
  },
  imagem: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 8
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4
  }
})

export default HomeScreen
