import React from 'react'
import { View, Text } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Followers from './Activity/Followers'
import you from './Activity/you'

const Tab = createMaterialTopTabNavigator();

export default function NotificationScreen() {
    return (
        <Tab.Navigator
            initialRouteName="first"
            tabBarOptions={{
                justifyContent: 'center',
                activeTintColor: '#000',
                inactiveTintColor: "gray",
                showIcon: true,
                // showLabel: false,
                indicatorStyle: {
                    backgroundColor: "#000"
                }
            }}>

            <Tab.Screen
                name="Followers"
                component={Followers}
                options={({ }) => ({
                    tabBarLabel: "Followers"


                })} />

            <Tab.Screen
                name="you"
                component={you}
                options={({ }) => ({
                    tabBarLabel: "you"
                })} />




        </Tab.Navigator>
    )
}

