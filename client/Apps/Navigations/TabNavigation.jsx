import React from 'react'
import ExploreScreen from '../screens/ExploreScreen'
import AddPostScreen from '../screens/AddPostScreen'
import ProfileScreen from '../screens/ProfileScreen'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Text } from 'react-native'

import { Ionicons } from '@expo/vector-icons'
import HomeScreenStackNavigation from './HomeScreenStackNavigation'

const Tap = createBottomTabNavigator()

const TabNavigation = () => {
  return (
    <Tap.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#e91e63',
      }}
    >
      <Tap.Screen
        name="home-nav"
        component={HomeScreenStackNavigation}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12, marginBottom: 3 }}>
              Home
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="home"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tap.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarLabel: ({ color }) => (
            <Text
              style={{
                color: color,
                fontSize: 12,
                marginBottom: 3,
              }}
            >
              Explore
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="search"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tap.Screen
        name="AddPost"
        component={AddPostScreen}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12, marginBottom: 3 }}>
              AddPost
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="camera"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tap.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12, marginBottom: 3 }}>
              Profile
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="person-circle"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tap.Navigator>
  )
}

export default TabNavigation
