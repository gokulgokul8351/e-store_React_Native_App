import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'

export default function ProductDetail() {
  const { params } = useRoute()
  const [product, setProduct] = useState([])

  useEffect(() => {
    params && setProduct(params.product)
  }, [params])

  const sendEmailMessage = () => {
    const subject = 'Regarding ' + product.title
    const body =
      'Hi ' + product.userName + '\n' + 'I am interested in this product'
    Linking.openURL(
      'mailto:' + product.userEmail + '?subject=' + subject + '&body=' + body
    )
  }

  return (
    <ScrollView className="bg-white">
      <Image
        source={{ uri: product.image }}
        className=" w-full h-[320px] "
      />

      <View className=" p-3 ">
        <Text className=" text-[26px] font-bold ">{product?.title}</Text>
        <View className="items-baseline">
          <Text className="bg-blue-200 text-blue-500 p-1 px-2 mt-2 rounded-full">
            {product?.category}
          </Text>
        </View>
        <Text className=" mt-3 font-bold text-[18px] ">Description</Text>
        <Text className="text-[14px] text-gray-500">{product?.desc}</Text>
      </View>

      {/* user info */}

      <View className=" p-3 flex flex-row items-center gap-3 border-[1px] border-transparent bg-blue-100 mt-2 ">
        <Image
          source={{ uri: product.userImage }}
          className=" w-12 h-12 rounded-full "
        />
        <View>
          <Text className="font-bold text-[18px]">{product?.userName}</Text>
          <Text className="text-gray-500">{product?.userEmail}</Text>
        </View>
      </View>

      {/* message sent btn */}

      <TouchableOpacity
        className="z-40 bg-blue-500 rounded-full p-4 m-3 "
        onPress={() => sendEmailMessage()}
      >
        <Text className="text-center text-white ">Send Message</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}
