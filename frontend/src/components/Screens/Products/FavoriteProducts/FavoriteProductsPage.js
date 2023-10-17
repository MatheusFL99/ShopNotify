import { SafeAreaView } from 'react-native'
import FavoriteProductsList from './FavoriteProductsList'

export default function FavoriteProductsPage() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-gray-200">
      <FavoriteProductsList />
    </SafeAreaView>
  )
}
