// import {
//   Platform,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   SafeAreaView,
//   StatusBar,
//   ImageBackground,
//   Alert,
// } from "react-native";
// import React, {useContext, useState} from "react";
// import {TextInput} from "react-native-gesture-handler";
// import axios from "axios";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import LinearGradient from "react-native-linear-gradient";
// import Colors from "../src/constants/colors"; // adjust path as needed
// import {ScreenProps} from "../src/navigation/types";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import {AuthContext} from "../App";
// import { useAuth } from "../AuthContext";
// // import {loginSuccess} from "../utils/auth";

// const LoginScreen = ({navigation}: ScreenProps<"Login">) => {
//   const [email, setemail] = useState<string>("");
//   const [password, setpassword] = useState<string>("");
//   const [showPassword, setShowPassword] = useState<boolean>(false);
//   const {signIn} = useAuth();
//   // const {setLoggedIn} = useContext(AuthContext);

//   const SearchLink =
//     Platform.OS === "web" ? "http://localhost:8080/user/login" : "http://10.0.2.2:8080/user/login";

//   const handlesubmit = async () => {
//     if (email.trim() && password.trim()) {
//       try {
//         const response = await axios.post(SearchLink, {email, password});
//         if (response) {
//           Alert.alert("Success", "Login Success");
//           // await loginSuccess(navigation);
//           // await AsyncStorage.setItem("Login_Status", "true");
//           navigation.navigate("Task", {
//             userId: response.data.id,
//             username: response.data.name,
//           });
//           // setLoggedIn(true); // from context
//           setemail("");
//           setpassword("");
//         }
//       } catch (error) {
//         Alert.alert("Error", "Credential mismatch");
//         console.log(error);
//       }
//     } else {
//       Alert.alert("Error", "Enter All Fields");
//     }
//     // setemail("");
//     setpassword("");
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor={Colors.primaryGradient[0]} />
//       <ImageBackground
//         source={{
//           uri: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2340&q=80",
//         }}
//         style={styles.backgroundImage}
//         resizeMode="cover"
//       >
//         <View style={styles.overlay}>
//           <View style={styles.container}>
//             <View style={styles.topSection}>
//               <Text style={styles.appTitle}>Welcome Back</Text>
//             </View>

//             <View style={styles.bottomSection}>
//               <Text style={styles.loginTitle}>Login</Text>

//               <View style={styles.inputContainer}>
//                 <TextInput
//                   value={email}
//                   style={styles.textInput}
//                   placeholder="Email"
//                   placeholderTextColor={Colors.textMuted}
//                   keyboardType="email-address"
//                   autoCapitalize="none"
//                   onChangeText={setemail}
//                 />
//               </View>

//               <View style={styles.inputContainer}>
//                 <View style={styles.passwordContainer}>
//                   <TextInput
//                     value={password}
//                     style={styles.passwordInput}
//                     placeholder="Password"
//                     placeholderTextColor={Colors.textMuted}
//                     secureTextEntry={!showPassword}
//                     onChangeText={setpassword}
//                   />
//                   <TouchableOpacity
//                     style={styles.eyeIcon}
//                     onPress={() => setShowPassword(!showPassword)}
//                   >
//                     <Icon
//                       name={showPassword ? "visibility" : "visibility-off"}
//                       size={20}
//                       color={Colors.textMuted}
//                     />
//                   </TouchableOpacity>
//                 </View>
//               </View>

//               <TouchableOpacity style={styles.loginButton} onPress={handlesubmit}>
//                 <LinearGradient
//                   colors={Colors.primaryGradient}
//                   style={styles.buttonGradient}
//                   start={{x: 0, y: 0}}
//                   end={{x: 1, y: 1}}
//                 >
//                   <Text style={styles.loginButtonText}>Login</Text>
//                 </LinearGradient>
//               </TouchableOpacity>

//               <View style={{backgroundColor: "white"}}>
//                 <View style={styles.signupContainer}>
//                   <Text style={styles.signupText}>Don't have an account? </Text>
//                   <TouchableOpacity onPress={() => navigation.replace("Home")}>
//                     <Text style={styles.signupLink}>Sign up</Text>
//                   </TouchableOpacity>
//                 </View>

//                 <View style={{}}>
//                   <TouchableOpacity onPress={() => navigation.replace("Forgot")}>
//                     <Text style={styles.Forgot}>Forgot password ?</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//           </View>
//         </View>
//       </ImageBackground>
//     </SafeAreaView>
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//   },
//   backgroundImage: {
//     flex: 1,
//   },
//   overlay: {
//     flex: 1,
//     backgroundColor: "rgba(0, 0, 0, 0.3)",
//   },
//   container: {
//     flex: 1,
//   },
//   topSection: {
//     flex: 1.2,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   appTitle: {
//     fontSize: 36,
//     fontWeight: "bold",
//     color: Colors.textPrimary,
//   },
//   bottomSection: {
//     flex: 1,
//     backgroundColor: Colors.cardBackground,
//     padding: 30,
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//   },
//   loginTitle: {
//     fontSize: 32,
//     fontWeight: "bold",
//     color: Colors.primaryGradient[1],
//     marginBottom: 30,
//   },
//   inputContainer: {
//     marginBottom: 20,
//     // borderColor: "black",
//     borderWidth: 2,
//     borderRadius: 10,
//   },
//   textInput: {
//     height: 50,
//     borderWidth: 1,
//     borderColor: Colors.inputBorder,
//     borderRadius: 8,
//     paddingHorizontal: 16,
//     fontSize: 16,
//     color: Colors.textDark,
//     backgroundColor: "#ffffff",
//   },
//   passwordContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     // borderWidth: 1,
//     // borderColor: "black",
//     borderRadius: 8,
//     backgroundColor: "#ffffff",
//     height: 50,
//   },
//   passwordInput: {
//     flex: 1,
//     paddingHorizontal: 16,
//     fontSize: 16,
//     color: Colors.textDark,
//   },
//   eyeIcon: {
//     paddingHorizontal: 16,
//   },
//   loginButton: {
//     height: 50,
//     borderRadius: 8,
//     overflow: "hidden",
//     marginBottom: 20,
//   },
//   buttonGradient: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   loginButtonText: {
//     color: Colors.textPrimary,
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   signupContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   signupText: {
//     fontSize: 16,
//     color: Colors.textMuted,
//   },
//   signupLink: {
//     fontSize: 16,
//     color: Colors.primaryGradient[1],
//     fontWeight: "500",
//   },
//   Forgot: {textAlign: "center", fontWeight: "bold", fontSize: 15},
// });

import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Alert,
} from "react-native";
import React, {useContext, useState} from "react";
import {TextInput} from "react-native-gesture-handler";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialIcons";
import LinearGradient from "react-native-linear-gradient";
import Colors from "../src/constants/colors"; // adjust path as needed
import {ScreenProps} from "../src/navigation/types";
import {useAuth} from "../AuthContext";

type Data = {
  email: string;
  password: string;
  showPassword: boolean;
};

const LoginScreen = ({navigation}: ScreenProps<"Login">) => {

  const [LoginData, setLoginData] = useState<Data>({
    email: "",
    password: "",
    showPassword: false,
  });
  const {signIn} = useAuth();

  const handlchange = (key: string, val: string | boolean) => {
    setLoginData(pre => ({...pre, [key]: val}));
  };

  const handlesubmit = async () => {
    if (LoginData.email.trim() && LoginData.password.trim()) {
      try {
        const response = await signIn(LoginData.email, LoginData.password);
        if (response) {
          Alert.alert("Success", "Login Success");
          setLoginData(pre => ({...pre, email: "", password: ""}));
        } else {
          Alert.alert("Error", "Credential mismatch");
        }
      } catch (error) {
        Alert.alert("Error", "Credential mismatch");
        console.log(error);
      }
    } else {
      Alert.alert("Error", "Enter All Fields");
    }
    setLoginData(pre => ({...pre, password: ""}));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primaryGradient[0]} />
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2340&q=80",
        }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <View style={styles.container}>
            <View style={styles.topSection}>
              <Text style={styles.appTitle}>Welcome Back</Text>
            </View>

            <View style={styles.bottomSection}>
              <Text style={styles.loginTitle}>Login</Text>

              <View style={styles.inputContainer}>
                <TextInput
                  value={LoginData.email}
                  style={styles.textInput}
                  placeholder="Email"
                  placeholderTextColor={Colors.textMuted}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  // onChangeText={e => setLoginData(pre => ({...pre, email: e}))}
                  onChangeText={e => handlchange("email", e)}
                />
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.passwordContainer}>
                  <TextInput
                    value={LoginData.password}
                    style={styles.passwordInput}
                    placeholder="Password"
                    placeholderTextColor={Colors.textMuted}
                    secureTextEntry={!LoginData.showPassword}
                    onChangeText={e => handlchange("password", e)}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
  
                    onPress={() => handlchange("showPassword", !LoginData.showPassword)}
                  >
                    <Icon
                      name={LoginData.showPassword ? "visibility" : "visibility-off"}
                      size={20}
                      color={Colors.textMuted}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity style={styles.loginButton} onPress={handlesubmit}>
                <LinearGradient
                  colors={Colors.primaryGradient}
                  style={styles.buttonGradient}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                >
                  <Text style={styles.loginButtonText}>Login</Text>
                </LinearGradient>
              </TouchableOpacity>

              <View style={{backgroundColor: "white"}}>
                <View style={styles.signupContainer}>
                  <Text style={styles.signupText}>Don't have an account? </Text>
                  <TouchableOpacity onPress={() => navigation.replace("Home")}>
                    <Text style={styles.signupLink}>Sign up</Text>
                  </TouchableOpacity>
                </View>

                <View style={{}}>
                  <TouchableOpacity onPress={() => navigation.replace("Forgot")}>
                    <Text style={styles.Forgot}>Forgot password ?</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  container: {
    flex: 1,
  },
  topSection: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
  },
  appTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: Colors.textPrimary,
  },
  bottomSection: {
    flex: 1,
    backgroundColor: Colors.cardBackground,
    padding: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  loginTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.primaryGradient[1],
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
    // borderColor: "black",
    borderWidth: 2,
    borderRadius: 10,
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: Colors.textDark,
    backgroundColor: "#ffffff",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    // borderWidth: 1,
    // borderColor: "black",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    height: 50,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    fontSize: 16,
    color: Colors.textDark,
  },
  eyeIcon: {
    paddingHorizontal: 16,
  },
  loginButton: {
    height: 50,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 20,
  },
  buttonGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loginButtonText: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: "600",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  signupText: {
    fontSize: 16,
    color: Colors.textMuted,
  },
  signupLink: {
    fontSize: 16,
    color: Colors.primaryGradient[1],
    fontWeight: "500",
  },
  Forgot: {textAlign: "center", fontWeight: "bold", fontSize: 15},
});
