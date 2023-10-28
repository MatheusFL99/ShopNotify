import React, { useState, useContext } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TextInput
} from 'react-native'
import defaultUrl from '../../../utils/defaultUrl'
import { AuthContext } from '../../../context/AuthContext'
import axios from 'axios'

const EditAddressScreen = ({ route, navigation }) => {
  const { addressId } = route.params
  const [name, setName] = useState('')
  const [streetaddress, setStreetaddress] = useState('')
  const [complement, setComplement] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zipcode, setZipcode] = useState('')
  const [country, setCountry] = useState('')
  const defaultURL = defaultUrl()
  const { userToken } = useContext(AuthContext)

  return <View></View>
}

export default EditAddressScreen
