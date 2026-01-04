import {Alert, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import Colors from "../src/constants/colors";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ScreenProps} from "../src/navigation/types";

const Forgot = ({navigation}: ScreenProps<"Forgot">) => {
  const [email, setemail] = useState<string>("");


    const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    if(email.trim()===""){
      Alert.alert("Warning","Enter Email To Continue...");
      setemail("")
      return;
    }

      if (!validateEmail(email)) {
          Alert.alert("Error", "Please enter a valid email address");
          setemail("")
          return;
        }
    await AsyncStorage.setItem("User_Email", email);

    try {
      const response = await axios.post("http://10.0.2.2:8080/user/Forgot1", {email: email});
      if (response.status) {
        Alert.alert("Success", "UserVerifies SuccessFully...");
      }
      navigation.replace("NewPassword");
    } catch (error) {
      console.log("error");
      Alert.alert("Error","User Not Available For this Email...");
      setemail("")
    }
  };
  return (
    <View style={styles.MainContainer}>
      <View style={styles.TopContainer}>
        <Text style={styles.emailText}>Enter Email Address</Text>
        <TextInput
          placeholder="Example@gmail.com"
          value={email}
          style={styles.input}
          onChangeText={e => setemail(e)}
        />

        <View style={{flexDirection: "row", justifyContent: "center", margin: 10}}>
          <Text style={styles.BackToText}>Back To </Text>
          <Text
            onPress={() => navigation.replace("Login")}
            style={[styles.BackToText, styles.LinkText]}
          >
            Log-In
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.GradiantButton]}
          activeOpacity={0.7}
          onPress={handleSubmit}
        >
          <LinearGradient
            colors={["#FF4E22", "#FF8F66"]}
            style={styles.Gradiant}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
          >
            <View style={styles.innerContainer}>
              <Text style={styles.SendText}>Send</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={styles.MiddleContainer}>
        <Text style={{fontWeight: "bold", fontSize: 25, color: "#FF4E22"}}>or</Text>
        <View style={{flexDirection: "row", gap: 15, marginTop: 10}}>
          <View style={styles.IconView}>
            <Icon name="facebook" size={20} color="white" />
          </View>

          <View style={styles.IconView}>
            <Icon name="google" size={20} color="white" />
          </View>

          <View style={styles.IconView}>
            <Icon name="apple" size={20} color="white" />
          </View>
        </View>
      </View>

      <View style={styles.BottomContainer}>
        <Text style={styles.signupText}>Don't Have Account ?</Text>
        <TouchableOpacity style={styles.signupButton} onPress={() => navigation.replace("Home")}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Forgot;

const styles = StyleSheet.create({
  signupButton: {
    borderWidth: 1,
    borderColor: "black",
    padding: 15,
    backgroundColor: "white",
    borderRadius: 25,
    // margin: 10,
    width: "100%",
    marginTop: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 15,
    backgroundColor: "white",
    borderRadius: 25,
  },
  signupText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  SendText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  BottomContainer: {
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "purple",
    padding: 15,
    flex: 1,
  },
  MainContainer: {
    flex: 1,
  },
  emailText: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 15,
  },
  TopContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 15,
  },
  BackToText: {
    // margin: 15,
    fontWeight: "bold",
    fontSize: 18,
    // textAlign: "center",
  },
  LinkText: {
    color: "blue",
  },
  Gradiant: {
    padding: 2, // Thickness of the border
    borderRadius: 10,
  },
  GradiantButton: {
    borderRadius: 20,
    overflow: "hidden",
  },
  innerContainer: {
    // backgroundColor: "white", // Button background
    borderRadius: 8, // Slightly smaller radius than outer
    paddingVertical: 12,
    paddingHorizontal: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  MiddleContainer: {
    flex: 0.5,
    // justifyContent: "center",
    alignItems: "center",
  },
  IconView: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "black",
    padding: 7,
    backgroundColor: "black",
    paddingHorizontal: 10,
  },
  //
});
