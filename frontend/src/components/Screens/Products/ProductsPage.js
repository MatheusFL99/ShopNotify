import { SafeAreaView } from 'react-native'
import ProductsList from './ProductsList'

export default function ProductsPage() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-gray-200">
      <ProductsList />
    </SafeAreaView>
  )
}
