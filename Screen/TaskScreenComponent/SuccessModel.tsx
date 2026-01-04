// import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React from 'react'

// const SuccessModel = ({visible,message,onClose}) => {
//   return (
//     <Modal transparent visible={visible} animationType="fade">
//         <View style={styles.Overlay}>
//             <View style={styles.MainContainer}>
//                 <Text style={styles.Icon}>✔️</Text>
//                 <Text style={styles.Message}>{message}</Text>
//                 <View style={{justifyContent:"center",alignItems:"center"}}>
//                     <TouchableOpacity style={styles.Button} onPress={onClose}>
//                     <Text style={styles.Text}>OK</Text>
//                 </TouchableOpacity>
//                 </View>
//             </View>
//         </View>
//     </Modal>
//   )
// }

// export default SuccessModel

// const styles = StyleSheet.create({
//     Overlay:{
//         flex:1,
//          backgroundColor: 'rgba(0,0,0,0.4)',
//          justifyContent:"center",
//          alignItems:"center"
//     },
//     MainContainer:{
//         backgroundColor:"#fff",
//         width:"80%",
//         borderRadius:15,
//         padding:20,
//         alignItems:"center"
//     },
//     Icon:{
//         fontSize:30,
//         fontWeight:"bold",
//         marginBottom:10,
//         borderWidth:2,
//         borderColor:"green",
//         padding:10,
//         borderRadius:15,
//         backgroundColor:"#64eb34",
//         color:"#fff"
//     },
//     Message:{
//         fontSize:30,
//         marginBottom:15,
//         marginTop:5,
//         textAlign:"center"
//     },
//     Button:{
//         borderWidth:2,
//         borderColor:"black",
//         borderRadius:15,
//         paddingVertical:10,
//         paddingHorizontal:15,
//         width:200,
//         justifyContent:"center",
//         alignItems:"center",
//         backgroundColor:"#4CAF50",
//         marginBottom:10
//     },
//     Text:{
//         fontSize:20,
//         color:"white"
//     }
// })

import {Modal, StyleSheet, Text, TouchableOpacity, View, Animated} from "react-native";
import React, {useEffect, useRef} from "react";
import Icon from "react-native-vector-icons/MaterialIcons";

const SuccessModal = ({visible, message, onClose, ValueId}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Scale and fade in animation
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Reset animations when modal closes
      scaleAnim.setValue(0);
      fadeAnim.setValue(0);
    }
  }, [visible]);

  return (
    <Modal transparent visible={visible} animationType="none">
      <Animated.View style={[styles.overlay, {opacity: fadeAnim}]}>
        <Animated.View
          style={[
            styles.mainContainer,
            {
              transform: [{scale: scaleAnim}],
            },
          ]}
        >
          {/* Success Icon with Gradient Background */}
          <View
            style={[styles.iconContainer, {backgroundColor: ValueId == 1 ? "#4CAF50" : "#FF9800"}]}
          >
            <Icon
              name={ValueId === 1 ? "check-circle" : "warning"}
              size={40}
              color="#fff"
            />
          </View>

          {/* Success Title */}
          <Text style={styles.title}>{ValueId == 1 ? "Success!" : "Warning!"}</Text>

          {/* Message */}
          <Text style={styles.message}>{message}</Text>

          {/* OK Button */}
          <TouchableOpacity style={styles.button} onPress={onClose} activeOpacity={0.8}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

export default SuccessModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  mainContainer: {
    backgroundColor: "#fff",
    width: "85%",
    maxWidth: 350,
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 10,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 50,
    // backgroundColor: '#4CAF50',
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#4CAF50",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  icon: {
    // fontSize: 35,
    // fontWeight: 'bold',
    // color: '#fff',
    // textAlign:"center",

    fontSize: 35,
    lineHeight: 40, // slightly more than fontSize
    textAlign: "center",
    includeFontPadding: false,
    textAlignVertical: "center",
    color: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  message: {
    fontSize: 20,
    color: "#666",
    textAlign: "center",
    marginBottom: 25,
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    minWidth: 120,
    shadowColor: "#4CAF50",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
  },
});
