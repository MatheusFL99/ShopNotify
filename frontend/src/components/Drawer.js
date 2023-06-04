import React, { useState } from 'react'
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'

const Drawer = ({ isOpen, onClose, children }) => {
  const [drawerWidth, setDrawerWidth] = useState(
    Dimensions.get('window').width * 0.8
  )

  const handleClose = () => {
    if (onClose) {
      onClose()
    }
  }

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={isOpen ? [styles.drawerContainer, { width: drawerWidth }] : null}
      onPress={handleClose}
    >
      <View style={styles.drawer}>{children}</View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  drawerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: '100%'
  },
  drawer: {
    flex: 1,
    backgroundColor: '#fff'
  }
})

export default Drawer
