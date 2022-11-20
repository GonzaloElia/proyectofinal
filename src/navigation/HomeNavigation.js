import { Text, View } from 'react-native'
import React, { Component } from 'react'
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import Home from '../screens/Home/Home'
import ProfileUsers from '../screens/ProfileUsers/ProfileUsers'

const Stack = createNativeStackNavigator()

class HomeNavigation extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
            name="Home"
            component={Home}
        />
        <Stack.Screen
            name="ProfileUsers"
            component={ProfileUsers}
        />
      </Stack.Navigator>
    )
  }
}
export default HomeNavigation