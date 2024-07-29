import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
import ItemList from '../screens/ItemList'
import ProductDetail from '../screens/ProductDetail'

const Stack = createStackNavigator()

const HomeScreenStackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="item-list"
        component={ItemList}
        options={({ route }) => ({
          title: route.params.category,
          headerStyle: {
            backgroundColor: '#3b82f6',
          },
          headerTintColor: '#fff',
        })}
      />
      <Stack.Screen
        name="product-detail"
        component={ProductDetail}
        options={{
          headerStyle: {
            backgroundColor: '#3b82f6',
          },
          headerTintColor: '#fff',
          headerTitle: 'Detail',
        }}
      />
    </Stack.Navigator>
  )
}

export default HomeScreenStackNavigation
