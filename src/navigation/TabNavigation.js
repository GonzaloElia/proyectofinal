import { Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { Component } from 'react'
import Home from '../screens/Home/Home'
const Tab= createBottomTabNavigator()
import {FontAwesome} from "@expo/vector-icons"
import Posts from "../screens/Posts/Posts"
import Profile from '../screens/Profile/profile'
import HomeNavigation from './HomeNavigation'
import Buscador from '../screens/Buscador/Buscador'

function TabNavigation() {
  return (
    <Tab.Navigator>
        <Tab.Screen 
            name={"HomeNavigation"} 
            component={HomeNavigation}
            options={{
                tabBarIcon: () => <FontAwesome name='home' color={"blue"} size={32}/>,
                headerShown: false
            }}
        />
        <Tab.Screen 
            name={"Posts"} 
            component={Posts}
            options={{
                tabBarIcon: () => <FontAwesome name='circle' color={"lightblue"} size={34}/>
            }}
        />
        <Tab.Screen 
            name={"Profile"} 
            component={Profile}
            options={{
                tabBarIcon: () => <FontAwesome name='at' color={"blue"} size={28}/>
            }}
        />
        <Tab.Screen 
            name={"Buscador"} 
            component={Buscador}
            options={{
                tabBarIcon: () => <FontAwesome name='search' color={"blue"} size={32}/>,
                headerShown: false
            }}
        />
    </Tab.Navigator>
  )
}

export default TabNavigation