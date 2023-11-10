import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from 'react-native-vector-icons'

// screen components
import ProductsPage from '../components/Screens/Products/ProductsPage'
import FavoriteProductsPage from '../components/Screens/Products/FavoriteProducts/FavoriteProductsPage'
import ProfileScreen from '../components/Screens/ProfileScreen'
import MyPurchases from '../components/Screens/Mypurchases'
import EditProfileScreen from '../components/Screens/EditProfileScreen'
import AddressesScreen from '../components/Screens/Adresses/AddressesScreen'
import CreateAddressScreen from '../components/Screens/Adresses/CreateAddressScreen'
import EditAddressScreen from '../components/Screens/Adresses/EditAddressScreen'
import CartScreen from '../components/Screens/CartScreen'
import MyPaymentMethodsScreen from '../components/Screens/Payment/MyPaymentMethodsScreen'
import PurchaseInAppScreen from '../components/Screens/PurchaseInAppScreen'
import BackButton from '../components/BackButton'
import HomeScreen from '../components/Screens/HomeScreen'

const Tab = createBottomTabNavigator()

const AppStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: [
          {
            display: 'flex'
          },
          null
        ],
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          switch (route.name) {
            case 'Pesquisar':
              iconName = focused ? 'search' : 'search-outline'
              break
            case 'Home':
              iconName = focused ? 'home' : 'home-outline'
              break
            case 'Perfil':
              iconName = focused ? 'person' : 'person-outline'
              break
            case 'Carrinho':
              iconName = focused ? 'cart' : 'cart-outline'
              break

            default:
              iconName = 'ellipse-outline'
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
        headerLeft: () => <BackButton navigation={navigation} />
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerLeft: '' }}
      />
      <Tab.Screen name="Pesquisar" component={ProductsPage} />
      <Tab.Screen name="Carrinho" component={CartScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
      <Tab.Screen
        name="Favoritos"
        component={FavoriteProductsPage}
        options={{ tabBarItemStyle: { display: 'none' } }}
      />
      <Tab.Screen
        name="Minhas compras"
        component={MyPurchases}
        options={{ tabBarItemStyle: { display: 'none' } }}
      />
      <Tab.Screen
        name="Editar Perfil"
        component={EditProfileScreen}
        options={{ tabBarItemStyle: { display: 'none' } }}
      />
      <Tab.Screen
        name="Endereços"
        component={AddressesScreen}
        options={{ tabBarItemStyle: { display: 'none' } }}
      />
      <Tab.Screen
        name="Adicionar Endereço"
        component={CreateAddressScreen}
        options={{ tabBarItemStyle: { display: 'none' } }}
      />
      <Tab.Screen
        name="Editar Endereço"
        component={EditAddressScreen}
        options={{ tabBarItemStyle: { display: 'none' } }}
      />
      <Tab.Screen
        name="Pagamentos"
        component={MyPaymentMethodsScreen}
        options={{ tabBarItemStyle: { display: 'none' } }}
      />
      <Tab.Screen
        name="Pagar no aplicativo"
        component={PurchaseInAppScreen}
        options={{ tabBarItemStyle: { display: 'none' } }}
      />
    </Tab.Navigator>
  )
}

export default AppStack
