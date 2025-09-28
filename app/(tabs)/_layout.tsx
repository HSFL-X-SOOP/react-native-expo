import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
export default function TabLayout() {
  const colorScheme = useColorScheme();
  const tabs =     <Tabs
    screenOptions={{
      tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      headerShown: false,
      tabBarButton: HapticTab,
      tabBarBackground: TabBarBackground,
      tabBarStyle: Platform.select({
        ios: {
          // Use a transparent background on iOS to show the blur effect
          position: 'absolute'
        },
        default: {},
      }),
    }}>
      <Tabs.Screen
        name="index"
        options={{
          // href: null,
          title: 'Map',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={"black"} />,
        }}
        />
            <Tabs.Screen
        name="profile"
        options={{
          // href: null,
          title: 'Profile',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={"black"} />,
        }}
        />        
        <Tabs.Screen
        name="about_tab"
        options={{
          // href: null,
          title: 'About',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={"black"} />,
        }}
        />     
                <Tabs.Screen
        name="auth_tab"
        options={{
          // href: null,
          title: 'Auth',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={"black"} />,
        }}
        />  
                        <Tabs.Screen
        name="dashboard_tab"
        options={{
          // href: null,
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={"black"} />,
        }}
        /> 
    </Tabs>

  let a = tabs
  if (false) {
  } else {
  }
  return (
    a
        
  );
}
