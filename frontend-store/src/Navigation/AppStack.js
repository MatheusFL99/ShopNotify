import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from 'react-native-vector-icons'

// screen components
import BackButton from '../components/BackButton'
import MyProducts from '../components/Screens/Products/MyProducts'
import EditProductScreen from '../components/Screens/Products/EditProductScreen'
import AddProductScreen from '../components/Screens/Products/AddProductScreen'
import LogoutComponent from '../components/LogoutComponent'
import MySales from '../components/Screens/MySales'
import HomeScreen from '../components/Screens/HomeScreen'
import TesteGeoLoc from '../components/TesteGeoLoc'
import ProfileScreen from '../components/Screens/ProfileScreen'
import EditProfileScreen from '../components/Screens/EditProfileScreen'

const Tab = createBottomTabNavigator()

const AppStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarActiveTintColor: '#836FFF',
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
            case 'Meus Produtos':
              iconName = focused ? 'layers' : 'layers-outline'
              break
            case 'Home':
              iconName = focused ? 'home' : 'home-outline'
              break
            case 'Minhas Vendas':
              iconName = focused ? 'cart' : 'cart-outline'
              break
            case 'Perfil':
              iconName = focused ? 'person' : 'person-outline'
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
      <Tab.Screen name="Meus Produtos" component={MyProducts} />
      <Tab.Screen name="Minhas Vendas" component={MySales} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
      <Tab.Screen
        name="Editar Produto"
        component={EditProductScreen}
        options={{ tabBarItemStyle: { display: 'none' } }}
      />
      <Tab.Screen
        name="Adicionar Produto"
        component={AddProductScreen}
        options={{ tabBarItemStyle: { display: 'none' } }}
      />
      <Tab.Screen
        name="Teste geoloc"
        component={TesteGeoLoc}
        options={{ tabBarItemStyle: { display: 'none' } }}
      />
      <Tab.Screen
        name="Editar Perfil"
        component={EditProfileScreen}
        options={{ tabBarItemStyle: { display: 'none' } }}
      />
    </Tab.Navigator>
  )
}

export default AppStack
