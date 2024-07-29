import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Categories = ({ categoryList }) => {
  const navigation = useNavigation()

  return (
    <View className="mt-3">
      <Text className=" font-bold text-[24px] ">Categories</Text>
      <FlatList
        data={categoryList}
        numColumns={4}
        renderItem={({ item, index }) =>
          index <= 7 && (
            <TouchableOpacity
              className=" flex-1 items-center justify-center p-2 border-[1px] bg-blue-50 border-blue-200 m-1 h-[80px] rounded-lg "
              onPress={() =>
                navigation.navigate('item-list', {
                  category: item.name,
                })
              }
            >
              <Image
                source={{ uri: item.icon }}
                className="h-[35px] w-[35px]  "
              />
              <Text className=" text-[12px] ">{item.name}</Text>
            </TouchableOpacity>
          )
        }
      />
    </View>
  )
}

export default Categories
