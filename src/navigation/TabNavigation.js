import { Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { Component } from 'react'
import Home from '../screens/Home/Home'
const Tab= createBottomTabNavigator()
import {FontAwesome} from "@expo/vector-icons"
import Posts from "../screens/Posts/Posts"
import Profile from '../screens/Profile/profile'

function TabNavigation() {
  return (
    <Tab.Navigator>
        <Tab.Screen 
            name={"Home"} 
            component={Home}
            options={{
                tabBarIcon: () => <FontAwesome name='home' color={"blue"} size={32}/>
            }}
        />
        <Tab.Screen 
            name={"Posts"} 
            component={Posts}
            options={{
                tabBarIcon: () => <FontAwesome name='posts' color={"blue"} size={32}/>
            }}
        />
        <Tab.Screen 
            name={"Profile"} 
            component={Profile}
            options={{
                tabBarIcon: () => <FontAwesome name='profile' color={"blue"} size={32}/>
            }}
        />
    </Tab.Navigator>
  )
}

export default TabNavigation