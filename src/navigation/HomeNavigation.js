import { Text, View } from 'react-native'
import React, { Component } from 'react'
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import Home from '../screens/Home/Home'
import Profile from '../screens/Profile/Profile'

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
            name="Profile"
            component={Profile}
        />
      </Stack.Navigator>
    )
  }
}
export default HomeNavigation