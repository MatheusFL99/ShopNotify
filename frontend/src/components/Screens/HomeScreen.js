import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native'

const HomeScreen = ({ navigation }) => {
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

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesSection}
      >
        <TouchableOpacity style={styles.categoryItem}>
          <Image
            source={require('../../../assets/images/TesteComputador.png')}
            style={styles.categoryIcon}
          />
          <Text>Computação</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryItem}>
          <Image
            source={require('../../../assets/images/testeModa.png')}
            style={styles.categoryIcon}
          />
          <Text>Moda</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryItem}>
          <Image
            source={require('../../../assets/images/teste8.png')}
            style={styles.categoryIcon}
          />
          <Text>Eletronicos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryItem}>
          <Image
            source={require('../../../assets/images/testeMaquiagem.png')}
            style={styles.categoryIcon}
          />
          <Text>Beleza</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryItem}>
          <Image
            source={require('../../../assets/images/TesteCasa.png')}
            style={styles.categoryIcon}
          />
          <Text>Casa</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.offersSection}>
        <Text style={styles.offersTitle}>Ofertas do Dia</Text>
        {/* Este container irá segurar suas ofertas, assumindo que você vai iterar sobre um array de ofertas */}
        {/* Coloque um FlatList ou ScrollView vertical aqui se houver muitas ofertas */}
        <TouchableOpacity style={styles.offerItem}>
          <Text style={styles.offerText}>R$ 49.90 OFF em Casa</Text>
          <Image
            source={require('../../../assets/images/teste22.png')}
            style={styles.offerImage}
          />
          <Text style={styles.offerExpiration}>Termina em: 15 dias</Text>
          <TouchableOpacity style={styles.offerButton}>
            <Text style={styles.offerButtonText}>Eu quero!</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity style={styles.offerItem}>
          <Text style={styles.offerText}>R$ 13.99 OFF em Moda</Text>
          <Image
            source={require('../../../assets/images/testeM.png')}
            style={styles.offerImage}
          />
          <Text style={styles.offerExpiration}>Termina em: 15 dias</Text>
          <TouchableOpacity style={styles.offerButton}>
            <Text style={styles.offerButtonText}>Eu quero!</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity style={styles.offerItem}>
          <Text style={styles.offerText}>R$ 100 OFF em Esporte</Text>
          <Image
            source={require('../../../assets/images/testeB.png')}
            style={styles.offerImage}
          />
          <Text style={styles.offerExpiration}>Termina em: 15 dias</Text>
          <TouchableOpacity style={styles.offerButton}>
            <Text style={styles.offerButtonText}>Eu quero!</Text>
          </TouchableOpacity>
        </TouchableOpacity>
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
  categoriesSection: {
    paddingVertical: 20,
    paddingLeft: 20,
    paddingRight: 10
  },
  categoryItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
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
