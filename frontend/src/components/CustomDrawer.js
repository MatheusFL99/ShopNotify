import React, { useContext } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import {
  DrawerContentScrollView,
  DrawerItemList
} from '@react-navigation/drawer'
import { AuthContext } from '../context/AuthContext'
import Icon from 'react-native-vector-icons/FontAwesome'

const CustomDrawer = props => {
  const { logout } = useContext(AuthContext)

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
        <TouchableOpacity
          onPress={logout}
          style={{
            paddingVertical: 15,
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Icon
            name="sign-out"
            size={20}
            color="#000"
            style={{ marginRight: 10 }}
          />
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CustomDrawer
