import React from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { useWarmUpBrowser } from '../../hooks/warmUpBrowser'
import * as WebBrowser from 'expo-web-browser'
import { useOAuth } from '@clerk/clerk-expo'

WebBrowser.maybeCompleteAuthSession()

const LoginScreen = () => {
  useWarmUpBrowser()

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow()

      if (createdSessionId) {
        setActive({ session: createdSessionId })
      } else {
      }
    } catch (err) {
      console.error('OAuth error', err)
    }
  }, [])

  return (
    <View>
      <Image
        source={require('../../assets/images/login1.png')}
        className=" w-full h-[400px] object-cover mt-12 "
      />
      <View className="p-8 mt-6  ">
        <Text className="text-[28px] font-extrabold text-center ">
          Community Marketplace
        </Text>
        <Text className="text-[18px] text-slate-500 mt-4 text-center ">
          Buy sell marketplace you can sell old item and make real money!
        </Text>
        <TouchableOpacity className=" p-4 bg-blue-500 rounded-full mt-20  ">
          <Text
            className=" text-white text-center text-[18px]  "
            onPress={onPress}
          >
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default LoginScreen
