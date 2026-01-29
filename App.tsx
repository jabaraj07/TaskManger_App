import {ActivityIndicator, StyleSheet, Text, View} from "react-native";
import React from "react";
import {AuthProvider, useAuth} from "./AuthContext";
import {NavigationContainer} from "@react-navigation/native";
import HomeStackScreen from "./Navigation/HomeStackScreen";
import AuthStack from "./Navigation/AuthStack";
import {TaskProvider} from "./TaskContext";

function RootNavigator(): JSX.Element {
  const {isSignedIn, isLoading} = useAuth();

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <ActivityIndicator size={30} color={"red"} />
      </View>
    );
  }
  return (
    <NavigationContainer key={isSignedIn ? "app" : "auth"}>
      <TaskProvider>{isSignedIn ? <HomeStackScreen /> : <AuthStack />}</TaskProvider>
    </NavigationContainer>
  );
}

const App = () => {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
};

export default App;
