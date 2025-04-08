import React from 'react';
import { StyleSheet, View, Text } from 'react-native'
import { Link, Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Colors } from '@/constants/Colors';


export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        position: 'absolute',
        bottom: 27,
        marginHorizontal: 20,
        elevation: 0,
        height: 70,
        backgroundColor: 'white',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
      }
    }}>
      <Tabs.Screen name="home" options={{
        tabBarIcon: ({ focused }) => (
          <View style={styles.tabs}>
            <Ionicons name={focused ? "home" : "home-outline"} color={focused ? Colors.primary : Colors.gray} size={24} />
            <Text style={{
              color: focused ? Colors.primary : Colors.gray,
              fontSize: 12,
              marginTop: 4
            }}>Home</Text>
          </View>
        )
      }} />

      {/* <Tabs.Screen name="favorites" options={{
        tabBarIcon: ({ focused }) => (
          <View style={styles.tabs}>
            <Ionicons name={focused ? "home" : "home-outline"} color={focused ? Colors.primary : Colors.gray} size={24} />
            <Text style={{
              color: focused ? Colors.primary : Colors.gray,
              fontSize: 12,
              marginTop: 4
            }}>Favoritos</Text>
          </View>
        )
      }} /> */}

      {/* <Tabs.Screen name="myrecipe" options={{
        tabBarIcon: ({ focused }) => (
          <View style={styles.iconAdd}>
            <Ionicons name="add" color={Colors.white} size={24} />
          </View>
        )
      }} /> */}

      <Tabs.Screen name="recipe" options={{
        tabBarIcon: ({ focused }) => (
          <View style={styles.tabs}>
            <MaterialCommunityIcons name={focused ? "food-takeout-box" : "food-takeout-box-outline"} color={focused ? Colors.primary : Colors.gray} size={24} />
            <Text style={{
              color: focused ? Colors.primary : Colors.gray,
              fontSize: 12,
              marginTop: 4
            }}>Receitas</Text>
          </View>
        )
      }} />

      <Tabs.Screen name="profile" options={{
        tabBarIcon: ({ focused }) => (
          <View style={styles.tabs}>
            <MaterialCommunityIcons name={focused ? "account-edit" : "account-edit-outline"} color={focused ? Colors.primary : Colors.gray} size={24} />
            <Text style={{
              color: focused ? Colors.primary : Colors.gray,
              fontSize: 12,
              marginTop: 4
            }}>Perfil</Text>
          </View>
        )
      }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabs: {
    width: 56,
    alignItems: 'center',
    paddingTop: 10,
  },
  iconAdd: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 56,
    height: 56,
    borderRadius: 999,
    backgroundColor: Colors.primary,
    marginBottom: 26,
  },
})
