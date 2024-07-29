import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'

const Header = () => {
  const { user } = useUser()

  return (
    <View>
      {/* header section */}
      <View className=" pb-4 pt-6 flex flex-row items-center gap-2 ">
        <Image
          source={{ uri: user?.imageUrl }}
          className=" rounded-full w-12 h-12 "
        />
        <View>
          <Text className="text-[12px]">Welcome</Text>
          <Text className="font-bold text-[16px] ">{user?.fullName}</Text>
        </View>
      </View>
      {/* search bar */}
      <View className="p-2 px-5 rounded-full flex flex-row items-center border-[1px] border-blue-300 bg-blue-50 ">
        <Ionicons
          name="search"
          size={24}
          color="gray"
        />
        <TextInput
          placeholder="Search"
          className=" ml-2 placeholder:text-[14px]"
        />
      </View>
    </View>
  )
}

export default Header
