// import {View, Text, StyleSheet, TouchableOpacity, Platform} from "react-native";
// import React, {useState} from "react";
// import {TextInput} from "react-native-gesture-handler";
// import axios from "axios";

// const HomeScreen = ({navigation}) => {
//   const [name, setname] = useState<string>("");
//   const [email, setemail] = useState<string>("");
//   const [password, setpassword] = useState<string>("");

//   const userlink =
//     Platform.OS == "web" ? "http://localhost:8080/user/save" : "http://10.0.2.2:8080/user/save";

//   const handleSubmit = async () => {
//     if (name.trim() == "" && email.trim() == "" && password.trim() == "") {
//       return alert("Enter All Field");
//     }
//     const data = {
//       name: name,
//       email: email,
//       password: password,
//     };
//     try {
//       const response = await axios.post(userlink, data);
//       if (response) {
//         alert("Success");
//         console.log(response.data);
//       }
//       navigation.replace("Login");
//     } catch (error) {
//       console.log(error);
//     }
//     setname("");
//     setemail("");
//     setpassword("");
//   };
//   return (
//     <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
//       <Text style={styles1.Header}>Signup Form </Text>

//       <View style={styles1.FullInputContainer}>
//         <View style={styles1.container}>
//           <Text style={styles1.text}>Name : </Text>
//           <TextInput
//             value={name}
//             style={styles1.input}
//             placeholder="Enter Name"
//             onChangeText={e => setname(e)}
//           />
//         </View>

//         <View style={styles1.container}>
//           <Text style={styles1.text}>Email : </Text>
//           <TextInput
//             value={email}
//             style={styles1.input}
//             placeholder="Enter Email"
//             onChangeText={e => setemail(e)}
//           />
//         </View>

//         <View style={styles1.container}>
//           <Text style={styles1.text}>password : </Text>
//           <TextInput
//             value={password}
//             style={styles1.input}
//             placeholder="Enter password"
//             secureTextEntry
//             onChangeText={e => setpassword(e)}
//           />
//         </View>

//         <View style={{flexDirection: "row"}}>
//           <TouchableOpacity style={styles1.SubmitButton} onPress={handleSubmit}>
//             <Text style={{color: "white", textAlign: "center"}}>Submit</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles1.SubmitButton}
//             onPress={() => navigation.navigate("Login")}
//           >
//             <Text style={{color: "white", textAlign: "center"}}>Login</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles1 = StyleSheet.create({
//   container: {
//     flexDirection: "column",
//     marginBottom: 10,
//   },
//   text: {
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 5,
//     fontSize: 20,
//   },
//   input: {
//     borderColor: "black",
//     borderWidth: 3,
//     width: 200,
//     padding: 1,
//     borderRadius: 8,
//   },
//   Header: {
//     fontWeight: "bold",
//     fontSize: 20,
//   },
//   FullInputContainer: {
//     borderColor: "purple",
//     borderWidth: 3,
//     padding: 40,
//     margin: 10,
//     borderRadius: 12,
//   },
//   SubmitButton: {
//     borderColor: "white",
//     borderWidth: 2,
//     backgroundColor: "black",
//     width: 100,
//     padding: 5,
//     borderRadius: 8,
//   },
// });

// export default HomeScreen;

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  Dimensions,
  Task,
} from "react-native";
import React, {useState} from "react";
import {TextInput} from "react-native-gesture-handler";
import axios from "axios";
import LinearGradient from "react-native-linear-gradient";
import Colors from "../src/constants/colors";
import {ScreenProps} from "../src/navigation/types";
const {width, height} = Dimensions.get("window");

const HomeScreen = ({navigation}: ScreenProps<"Home">) => {

  type signupType = {
    name: string;
    email: string;
    password: string;
    loading: boolean;
  };

  const [SignupData, setSignupData] = useState<signupType>({
    name: "",
    email: "",
    password: "",
    loading: false,
  });

  const userlink =
    Platform.OS == "web" ? "http://localhost:8080/user/save" : "http://10.0.2.2:8080/user/save";

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    // Validation
    if (!SignupData.name.trim() || !SignupData.email.trim() || !SignupData.password.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (!validateEmail(SignupData.email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    if (SignupData.password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return;
    }

    setSignupData(pre => ({...pre, loading: true}));
    const data = {
      name: SignupData.name.trim(),
      email: SignupData.email.trim().toLowerCase(),
      password: SignupData.password,
    };

    try {
      const response = await axios.post(userlink, data);
      if (response) {
        Alert.alert("Success", "Account created successfully!", [
          {
            text: "OK",
            onPress: () => navigation.replace("Login"),
          },
        ]);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setSignupData(pre => ({...pre, loading: false, name: "", email: "", password: ""}));
    }
  };

  const handleChange = (key: string, val: string) => {
    setSignupData(pre => ({...pre, [key]: val}));
  };

  return (
    <View style={{flex: 1}}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      > */}

        <View style={styles.headerContainer}>
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>✨</Text>
            </View>
          </View>
          <Text style={styles.welcomeText}>Create Account</Text>
          <Text style={styles.subtitleText}>Join us and start your journey</Text>
        </View>

        <View style={{padding: 10}}>
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputIcon}>👤</Text>
                <TextInput
                  value={SignupData.name}
                  style={styles.textInput}
                  placeholder="Enter your full name"
                  placeholderTextColor="#9CA3AF"
                  onChangeText={e => handleChange("name", e)}
                  autoCapitalize="words"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputIcon}>📧</Text>
                <TextInput
                  value={SignupData.email}
                  style={styles.textInput}
                  placeholder="Enter your email"
                  placeholderTextColor="#9CA3AF"
                  onChangeText={e => handleChange("email", e)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputIcon}>🔒</Text>
                <TextInput
                  value={SignupData.password}
                  style={styles.textInput}
                  placeholder="Create a password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry
                  onChangeText={e => handleChange("password", e)}
                  autoCapitalize="none"
                  maxLength={6}
                />
              </View>
            </View>

            <TouchableOpacity
              style={[styles.submitButton, SignupData.loading && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={SignupData.loading}
              activeOpacity={0.8}
            >
              <Text style={styles.submitButtonText}>
                {SignupData.loading ? "Creating Account..." : "Create Account"}
              </Text>
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => navigation.navigate("Login")}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={Colors.primaryGradient}
                style={styles.buttonGradient}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
              >
                <Text style={styles.loginButtonText}>Already have an account? Sign In</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* </ScrollView> */}
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingBottom: 30,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logoContainer: {
    marginTop: 10,
    marginBottom: 10,
    // backgroundColor: "red",
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#6366F1",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  logoText: {
    fontSize: 32,
    color: "white",
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitleText: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
  },
  formContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    marginBottom: 24,
    borderColor: "black",
    borderWidth: 1,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    borderWidth: 1,
    // borderColor: "#E5E7EB",
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderColor: "black",
  },
  inputIcon: {
    fontSize: 18,
    marginRight: 12,
    color: "#000000",
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#000000",
    paddingVertical: 12,
  },
  submitButton: {
    backgroundColor: "#000000",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
    shadowColor: "#6366F1",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonDisabled: {
    backgroundColor: "#9CA3AF",
    shadowOpacity: 0,
    elevation: 0,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 2,
    // backgroundColor: "#E5E7EB",
    backgroundColor: "black",
  },
  dividerText: {
    color: "#9CA3AF",
    paddingHorizontal: 16,
    paddingVertical: 5,
    fontSize: 18,
    // backgroundColor: "red",
  },
  loginButton: {
    // backgroundColor: "transparent",
    // borderRadius: 12,
    // paddingVertical: 16,
    // alignItems: "center",
    // borderWidth: 1,
    // borderColor: "#D1D5DB",
    height: 50,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 20,
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  footerContainer: {
    alignItems: "center",
    paddingHorizontal: 8,
  },
  footerText: {
    fontSize: 12,
    color: "#9CA3AF",
    textAlign: "center",
    lineHeight: 18,
  },
  buttonGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
