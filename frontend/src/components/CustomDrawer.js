import React, { useContext } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import {
  DrawerContentScrollView,
  DrawerItemList
} from '@react-navigation/drawer'
import { AuthContext } from '../context/AuthContext'

const CustomDrawer = props => {
  const { logout } = useContext(AuthContext)

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
        <TouchableOpacity onPress={logout} style={{ paddingVertical: 15 }}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CustomDrawer
