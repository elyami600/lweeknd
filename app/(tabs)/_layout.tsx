import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';
import HomeScreen from'@/src/components/screens/HomeScreen';
import AboutScreen from '@/src/components/screens/AboutScreen';
import UserScreen from '@/src/components/screens/UsersScreen';
import DashboardScreen from '@/src/components/screens/DashboardScreen';

import Feather from '@expo/vector-icons/Feather';
import { users } from '@/src/utils/mockData';

export type RootTabParamList = {
  Explore: undefined;
  About: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const MyBottomTabNavigator = () => {
  return (
    
      <Tab.Navigator
      
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, size, color }) => {
            let iconComponent;

            switch (route.name) {
              case 'Explore':
                iconComponent = focused ? (
                    <Feather name="search" size={size} color={color} />
                ) : (
                    <Feather name="search" size={size} ccolor={color} />
                );
                break;
              case 'About':
                iconComponent = focused ? (
                  <FontAwesome name="heartbeat" size={size} color={color} />
                ) : (
                  <FontAwesome name="heartbeat" size={size} color={color} />
                );
                break;
              default:
                iconComponent = <Ionicons name="information-circle-outline" size={size} color={color} />;
            }

            return iconComponent;
          },
          tabBarActiveTintColor: '#ff6347', // Tomato color for active tab
          tabBarInactiveTintColor: '#808080', // Gray for inactive tabs
          tabBarStyle: {
            backgroundColor: '#fff',
            paddingBottom: 8,
            height: 65,
            borderTopWidth: 1,
            borderTopColor: '#ddd',
          },
          headerShown: false, // Hide header for a cleaner look
        })}
      >
        <Tab.Screen name="Explore"  component={DashboardScreen} />
        <Tab.Screen name="About"    component={AboutScreen} />
      </Tab.Navigator>
   
  );
};

export default MyBottomTabNavigator;
