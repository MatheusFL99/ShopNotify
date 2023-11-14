import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
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
            case 'Meus Produtos':
              iconName = focused ? 'layers' : 'layers-outline'
              break
            case 'Home':
              iconName = focused ? 'home' : 'home-outline'
              break
            case 'Minhas vendas':
              iconName = focused ? 'cart' : 'cart-outline'
              break
            case 'Sair':
              iconName = focused ? 'exit' : 'exit-outline'
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
      <Tab.Screen name="Minhas vendas" component={MySales} />
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
      <Tab.Screen name="Sair" component={LogoutComponent} />
    </Tab.Navigator>
  )
}

export default AppStack
