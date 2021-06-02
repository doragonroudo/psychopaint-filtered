import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// screens
import HomeScreen from '../screens/HomeScreen'
import TESTDrawScreen from '../screens/TESTDrawScreen'

import HTPModeScreen from '../screens/HTPScreens/HTPModeScreen'
import HTPInfoScreen from '../screens/HTPScreens/HTPInfoScreen'
import HTPDrawScreen from '../screens/HTPScreens/HTPDrawScreen'
import HTPResultScreen from '../screens/HTPScreens/HTPResultScreen'

import CLKModeScreen from '../screens/CLKScreens/CLKModeScreen'
import CLKInfoScreen from '../screens/CLKScreens/CLKInfoScreen'
import CLKDrawScreen from '../screens/CLKScreens/CLKDrawScreen'
import CLKResultScreen from '../screens/CLKScreens/CLKResultScreen'

const globalScreenOptions = {
  headerShown: false,
  gestureResponseDistance: {
    horizontal: -1,
    vertical: -1,
  },
}

const HomeStack = createStackNavigator()

export const HomeScreenStack = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={globalScreenOptions}
      />
      <HomeStack.Screen
        name="TESTDraw"
        component={TESTDrawScreen}
        options={globalScreenOptions}
      />
      <HomeStack.Screen
        name="HTPMode"
        component={HTPModeScreen}
        options={globalScreenOptions}
      />
      <HomeStack.Screen
        name="HTPInfo"
        component={HTPInfoScreen}
        options={globalScreenOptions}
      />
      <HomeStack.Screen
        name="HTPDraw"
        component={HTPDrawScreen}
        options={globalScreenOptions}
      />
      <HomeStack.Screen
        name="HTPResult"
        component={HTPResultScreen}
        options={globalScreenOptions}
      />
      <HomeStack.Screen
        name="CLKMode"
        component={CLKModeScreen}
        options={globalScreenOptions}
      />
      <HomeStack.Screen
        name="CLKInfo"
        component={CLKInfoScreen}
        options={globalScreenOptions}
      />
      <HomeStack.Screen
        name="CLKDraw"
        component={CLKDrawScreen}
        options={globalScreenOptions}
      />
      <HomeStack.Screen
        name="CLKResult"
        component={CLKResultScreen}
        options={globalScreenOptions}
      />
    </HomeStack.Navigator>
  )
}

export const Navigation = () => {
  return (
    <NavigationContainer>
      <HomeScreenStack />
    </NavigationContainer>
  )
}
