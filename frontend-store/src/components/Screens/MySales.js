import React, { useState, useContext, useCallback, useEffect } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  RefreshControl,
  Image,
  Dimensions,
  ScrollView
} from 'react-native'
import axios from 'axios'
import defaultUrl from '../../utils/defaultUrl'
import { AuthContext } from '../../context/AuthContext'
import { PieChart } from 'react-native-chart-kit'
import { useFocusEffect } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'

const MySales = () => {
  const [sales, setSales] = useState([])
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [totalProductsSold, setTotalProductsSold] = useState(0)
  const [refreshing, setRefreshing] = useState(false)
  const { storeToken } = useContext(AuthContext)
  const defaultURL = defaultUrl()

  const fetchSales = async () => {
    try {
      const response = await axios.get(`${defaultURL}/purchases/mysales`, {
        headers: {
          Authorization: `Bearer ${storeToken}`
        }
      })
      console.log('Fetched Data:', response.data)
      setSales(response.data.reverse())
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setRefreshing(false)
    }
  }
  const handleRefresh = () => {
    setRefreshing(true)
    fetchSales()
  }

  useFocusEffect(
    useCallback(() => {
      handleRefresh()
    }, [storeToken])
  )

  useEffect(() => {
    let revenue = 0
    let productsSold = 0

    sales.forEach(sale => {
      revenue += sale.products.reduce((acc, product) => acc + product.price, 0)
      productsSold += sale.products.length
    })

    setTotalRevenue(revenue)
    setTotalProductsSold(productsSold)
  }, [sales])

  const chartConfig = {
    backgroundColor: '#1cc910',
    backgroundGradientFrom: '#eff3ff',
    backgroundGradientTo: '#efefef',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    fromZero: true
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Faturamento</Text>
        <PieChart
          data={[
            {
              name: 'Faturamento',
              amount: totalRevenue,
              color: 'red',
              legendFontColor: '#7F7F7F',
              legendFontSize: 10
            },
            {
              name: 'Produtos Vendidos',
              amount: totalProductsSold,
              color: 'blue',
              legendFontColor: '#7F7F7F',
              legendFontSize: 10
            }
          ]}
          width={Dimensions.get('window').width - 30}
          height={220}
          chartConfig={chartConfig}
          accessor={'amount'}
          backgroundColor={'transparent'}
          paddingLeft={'15'}
          absolute
        />
      </View>

      <View style={styles.FlatListContainer}>
        <Text style={styles.containertitle}>Histórico de vendas</Text>
        <FlatList
          data={sales}
          style={styles.container}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image
                source={{ uri: item.products[0].image }}
                style={styles.image}
              />
              <View style={styles.infoContainer}>
                <Text style={styles.title}>{item.products[0].title}</Text>
                <View style={styles.detailContainer}>
                  <Text style={styles.price}>R$ {item.products[0].price}</Text>
                </View>
                <View style={styles.detailContainer}>
                  <MaterialIcons name="event" size={18} color="gray" />
                  <Text style={styles.date}>
                    {new Date(item.date).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </Text>
                </View>
              </View>
            </View>
          )}
          keyExtractor={item => item._id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingBottom: 20,
    marginBottom: 20,
    minHeight: '100%'
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 10,
    alignItems: 'center'
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  containertitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
    marginLeft: 3
  },
  date: {
    fontSize: 14,
    color: 'gray',
    marginLeft: 5
  },
  chartContainer: {
    flex: 1,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  chart: {
    marginVertical: 8,
    borderRadius: 8,
    padding: 10,
    alignItems: 'center'
  }
})

export default MySales
