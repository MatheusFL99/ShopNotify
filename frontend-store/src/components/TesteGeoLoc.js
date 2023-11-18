import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Dimensions, Text } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'

const { width, height } = Dimensions.get('window')

export default function TesteGeoLoc() {
  const [location, setLocation] = useState(null)

  async function handleLocationPermission() {
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
      if (subscription) {
        subscription.then(sub => sub.remove())
      }
    }
  }, [])

  return (
    <View style={styles.container}>
      {location ? (
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
      ) : (
        <Text style={styles.loadingText}>Carregando mapa...</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  map: {
    width: width,
    height: height * 0.4,
    borderRadius: 20,
    marginVertical: height * 0.15
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  }
})
