import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, StyleSheet, Switch, Text, View } from 'react-native'
import { useColorScheme } from 'react-native'
import ProductsList from './ProductsList'

export default function ProductsPage() {
  const { colorScheme, toggleColorScheme } = useColorScheme()
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-gray-200 dark:bg-black">
      <View className="flex-row w-full gap-5">
        <Text className="dark:text-white text-2xl font-bold"></Text>
        <Switch value={colorScheme === 'dark'} onChange={toggleColorScheme} />
      </View>
      <ProductsList />
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </SafeAreaView>
  )
}
