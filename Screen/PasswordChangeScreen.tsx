import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, {useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import LinearGradient from "react-native-linear-gradient";
import Colors from "../src/constants/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import {ScreenProps} from "../src/navigation/types";

const PasswordChangeScreen = ({navigation}: ScreenProps<"NewPassword">) => {

  const [pass, setpass] = useState({
    password: "",
    confirmPassword: "",
    error: "",
    loading: false,
    success: false,
    showPassword: false,
    showPassword1: false,
  });

  const handleSubmit = async () => {
    if (
      !pass.password ||
      !pass.confirmPassword ||
      pass.password.trim() == "" ||
      pass.confirmPassword.trim() == ""
    ) {
      setpass(pre => ({...pre, error: "Enter All Field's"}));
      setTimeout(() => {
        setpass(pre => ({...pre, error: ""}));
      }, 2000);
      return;
    }
    setpass(pre => ({...pre, loading: true}));
    try {
      if (pass.password.trim() === pass.confirmPassword.trim()) {
        const email = await AsyncStorage.getItem("User_Email");
        const response = await axios.post("http://10.0.2.2:8080/user/ChangePassword", {
          email: email,
          password: pass.password,
        });
        if (response.status) {
          Alert.alert("success", "User Password Change Success....");
          navigation.replace("Login");
          setpass(pre => ({...pre, success: true}));
        }
      } else {
        setpass(pre => ({...pre, error: "Password Do not Match..."}));
      }
    } catch (error) {
      console.log(error);
    } finally {
      if (pass.success) {
        await AsyncStorage.removeItem("User_Email");
      }
      setTimeout(() => {
        setpass(pre => ({...pre, error: ""}));
      }, 2000);
      setpass(pre => ({...pre, loading: false}));
    }
  };
  return (
    <View style={styles.MainContainer}>
      <View style={styles.Container1}>
        <Text style={styles.input1Text}>Enter New Password </Text>

        <View style={{borderWidth: 2, borderRadius: 16}}>
          <View
            style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}
          >
            <TextInput
              placeholder="Enter Confirm Password"
              value={pass.password}
              style={styles.input1}
              onChangeText={e => setpass(pre => ({...pre, password: e}))}
              maxLength={6}
              secureTextEntry={pass.showPassword1 ? false : true}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setpass(pre => ({...pre, showPassword1: !pass.showPassword1}))}
            >
              <Icon
                name={pass.showPassword1 ? "visibility" : "visibility-off"}
                size={20}
                color={Colors.textMuted}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.Container1}>
        <Text style={styles.input1Text}>Enter Confirm Password </Text>

        <View style={{borderWidth: 2, borderRadius: 16}}>
          <View
            style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}
          >
            <TextInput
              placeholder="Enter Confirm Password"
              value={pass.confirmPassword}
              style={styles.input1}
              onChangeText={e => setpass(pre => ({...pre, confirmPassword: e}))}
              maxLength={6}
              secureTextEntry={pass.showPassword ? false : true}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setpass(pre => ({...pre, showPassword: !pass.showPassword}))}
            >
              <Icon
                name={pass.showPassword ? "visibility" : "visibility-off"}
                size={20}
                color={Colors.textMuted}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {pass.error && (
        <View style={styles.ErrorConatiner}>
          <Text style={styles.ErrorText}>{pass.error}</Text>
        </View>
      )}
      <View style={{padding: 10}}>
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
              {pass.loading ? (
                <ActivityIndicator size={"large"} color={"red"} />
              ) : (
                <Text style={styles.SendText}>Send</Text>
              )}
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={{justifyContent: "center", alignItems: "center", marginTop: 10}}>
        <Text style={{fontSize: 22, color: "#FF4E22"}}>or</Text>
        <Text style={{fontSize: 18, color: "black", marginTop: 5}}>
          Back To{" "}
          <Text style={{color: "#FF4E22"}} onPress={() => navigation.replace("Login")}>
            Log-In
          </Text>
        </Text>
      </View>
      {/* <Button title="Submit" onPress={handleSubmit} /> */}
    </View>
  );
};

export default PasswordChangeScreen;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "white",
    borderRadius: 25,
    fontSize: 16,
  },
  input1: {
    paddingHorizontal: 16,
    // borderWidth: 1,
    flex: 1,
  },
  Container1: {
    // flex: 1,
    padding: 10,
  },
  input1Text: {
    marginBottom: 10,
    marginLeft: 5,
    fontSize: 15,
    fontWeight: "bold",
  },
  GradiantButton: {
    borderRadius: 20,
    overflow: "hidden",
  },
  Gradiant: {
    padding: 2, // Thickness of the border
    borderRadius: 10,
  },
  innerContainer: {
    // backgroundColor: "white", // Button background
    borderRadius: 8, // Slightly smaller radius than outer
    paddingVertical: 12,
    paddingHorizontal: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  SendText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  ErrorConatiner: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  ErrorText: {
    color: "red",
    fontWeight: "bold",
    fontSize: 20,
  },
  eyeIcon: {
    paddingHorizontal: 16,
  },
});
