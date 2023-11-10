import React from 'react'
import { TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

const BackButton = ({ navigation }) => (
  <TouchableOpacity
    onPress={() => {
      navigation.goBack()
    }}
    style={{ marginLeft: 10 }}
  >
    <MaterialIcons name="arrow-back" size={24} color="black" />
  </TouchableOpacity>
)

export default BackButton
