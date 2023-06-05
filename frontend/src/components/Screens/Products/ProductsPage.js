import { SafeAreaView, Text, View } from 'react-native'
import ProductsList from './ProductsList'

export default function ProductsPage() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-gray-200 dark:bg-black">
      <View className="flex-row w-full gap-5">
        <Text className="dark:text-white text-2xl font-bold"></Text>
      </View>
      <ProductsList />
    </SafeAreaView>
  )
}
