import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome, Feather } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import DashboardScreen from '@/src/components/screens/DashboardScreen';
import AboutScreen from '@/src/components/screens/AboutScreen';
import StylistProfile from './stylist';
import LoginScreen from '@/src/components/screens/feature/login/LoginScreen';
import HomeScreen from '@/src/components/screens/DashboardScreen';


export type RootTabParamList = {
  Explore: undefined;
  Stylist: undefined;
  About: undefined;
  Login: undefined; 

  

};

const Tab = createBottomTabNavigator<RootTabParamList>();

const MyBottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size, color }) => {
          if (route.name === 'Explore') {
            return <Feather name="search" size={size} color={color} />;
          } else if (route.name === 'Stylist') {
            return <Ionicons name="cut" size={size} color={color} />;
          } else if (route.name === 'About') {
            return <FontAwesome name="heartbeat" size={size} color={color} />;
          } else if (route.name === 'Login') {
            return <FontAwesome5 name="user-circle" size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: '#A3512B', // Custom orange-brown
        tabBarInactiveTintColor: '#b0b0b0', // Soft gray
        tabBarStyle: {
          backgroundColor: '#ffffff',
          height: 65,
          borderTopWidth: 1,
          borderTopColor: '#eeeeee',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarItemStyle: {
          paddingVertical: 8,
        },
        headerShown: false,
      })}
    >
       
      <Tab.Screen name="Explore" component={DashboardScreen} />
      <Tab.Screen name="Stylist" component={StylistProfile} />
      <Tab.Screen name="About" component={AboutScreen} />
      <Tab.Screen name="Login" component={LoginScreen} /> 
    </Tab.Navigator>
  );
};

export default MyBottomTabNavigator;
