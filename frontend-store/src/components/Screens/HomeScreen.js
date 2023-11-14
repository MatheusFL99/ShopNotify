import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native'

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      {/* Espaço para o componente de geolocalização */}
      <View style={styles.mapContainer}>
        <TouchableOpacity>
          <Image
            source={require('../../../assets/images/Mapa.png')}
            style={styles.map}
          />
          <Text style={styles.locationText}>Localização</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.locationText}>
        Sua localização no mapa pode variar!
      </Text>

      <View style={styles.produto1Container}>
        <Image
          source={require('../../../assets/images/testeModa.png')}
          style={styles.imagem}
        />
        <Text style={styles.nome}>Produto 1</Text>
      </View>

      <View style={styles.produto2Container}>
        <Image
          source={require('../../../assets/images/teste8.png')}
          style={styles.imagem}
        />
        <Text style={styles.nome}>Prouto 2</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5' // Um fundo claro para a tela
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    color: '#333' // Um tom escuro para o texto do título
  },
  mapContainer: {
    alignItems: 'center',
    marginVertical: 20 // Espaçamento vertical para separar do restante do conteúdo
  },
  locationText: {
    padding: 10,
    textAlign: 'center',
    fontSize: 16,
    color: '#666', // Um tom escuro suave para o texto
    marginTop: 8 // Espaço entre a imagem do mapa e o texto de localização
  },
  // Estilos específicos para Produto 1
  produto1Container: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16
  },
  // Estilos específicos para Produto 2
  produto2Container: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#f9f9f9',
    marginBottom: 16
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
