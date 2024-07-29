import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo'
import { View } from 'react-native'
import LoginScreen from './Apps/screens/LoginScreen'
import { NavigationContainer } from '@react-navigation/native'
import TabNavigation from './Apps/Navigations/TabNavigation'
import { StatusBar } from 'expo-status-bar'

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

export default function App() {
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <View className="flex-1 ">
        <StatusBar style="auto" />
        <SignedIn>
          <NavigationContainer>
            <TabNavigation />
          </NavigationContainer>
        </SignedIn>
        <SignedOut>
          <LoginScreen />
        </SignedOut>
      </View>
    </ClerkProvider>
  )
}
