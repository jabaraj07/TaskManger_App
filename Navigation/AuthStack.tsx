import {Button, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "../Screen/HomeScreen";
import LoginScreen from "../Screen/LoginScreen";
import TaskScreen from "../Screen/TaskScreenComponent/TaskScreen";

// const HomeStack = createNativeStackNavigator();

import {RootStackParamList} from "../src/navigation/types";
import Forgot from "../Screen/Forgot";
import PasswordChangeScreen from "../Screen/PasswordChangeScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeStack = createNativeStackNavigator<RootStackParamList>();

const AuthStack = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={() => ({
          headerBackVisible: false,
          headerLeft: () => null,
          headerShown: false,
        })}
      />
      <HomeStack.Screen
        name="Login"
        component={LoginScreen}
        options={() => ({
          headerBackVisible: false,
          headerLeft: () => null,
          headerShown: false,
        })}
      />

      <HomeStack.Screen
        name="NewPassword"
        component={PasswordChangeScreen}
        options={{
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTintColor: "black",
        }}
      />
      <HomeStack.Screen
        name="Forgot"
        component={Forgot}
        options={{
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTintColor: "black",
        }}
      />
    </HomeStack.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({
  logoutButton: {
    marginRight: 15,
    padding: 8,
    backgroundColor: "white",
    borderRadius: 5,
  },
  logoutText: {
    color: "#667eea",
    fontWeight: "bold",
  },
});
