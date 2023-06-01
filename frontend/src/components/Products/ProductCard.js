import * as React from 'react'
import { View, Text, Pressable, Image, TouchableOpacity } from 'react-native'
// import { products } from "../products";

export default function ProductCard({
  image,
  category,
  title,
  price,
  discount,
  finalPrice,
  description
}) {
  // const product = products[0]; depois os produtos vão vir do backend

  const formattedPrice = price.toFixed(2).replace('.', ',')
  const formattedFinalPrice = finalPrice.toFixed(2).replace('.', ',')

  return (
    <View className="w-full bg-white dark:bg-gray-50/10 rounded-3xl p-5 my-5">
      <View className="bg-white rounded-xl relative">
        <Image
          source={{ uri: image }}
          className="w-full h-72"
          style={{ resizeMode: 'contain' }}
        />
        {discount && (
          <View className="absolute top-2 right-2">
            <Text className="bg-green-500 rounded-full px-3 py-3 text-white text-s font-bold">
              {discount}% OFF
            </Text>
          </View>
        )}
      </View>
      <View className="mt-5">
        <Text className="text-sm text-black/60 dark:text-white/70">
          {category}
        </Text>
        <Text className="text-lg font-semibold dark:text-white">{title}</Text>
        <Text className="text-1xl dark:text-white line-through">
          R$ {formattedPrice}
        </Text>
        <View className="flex-row justify-between items-center my-3">
          <View className="flex-row items-center gap-3">
            <Text className="text-3xl text-green font-extrabold dark:text-white">
              R$ {formattedFinalPrice}
            </Text>
          </View>
        </View>
        <Text
          numberOfLines={2}
          className="text-sm text-black/60 dark:text-white/70"
        >
          {description}
        </Text>
        <TouchableOpacity className="flex-row justify-center rounded-full bg-black/90 dark:bg-white/90 p-3 w-10/12 self-center mt-5">
          <Text className="text-white dark:text-black font-bold">
            Resgatar Cupom
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
