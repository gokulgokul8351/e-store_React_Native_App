import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const PostItem = ({ item }) => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      className="flex-1 m-2 p-2 border-[1px] border-slate-200  "
      onPress={() =>
        navigation.push('product-detail', {
          product: item,
        })
      }
    >
      <Image
        source={{ uri: item.image }}
        className="w-full h-[140px] rounded-lg "
      />
      <View>
        <Text className=" tex-[15px] font-bold mt-2 ">{item.title}</Text>
        <Text className=" text-[17px]  font-bold text-blue-500 ">
          ₹ {item.price}
        </Text>
        <Text className=" text-blue-500 bg-blue-200 p-[4px] mt-1 text-center text-[10px]  rounded-lg w-[70px] ">
          {item.category}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
export default PostItem
