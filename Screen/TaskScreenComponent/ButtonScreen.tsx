import {ActivityIndicator, Alert, Animated, Easing, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useContext, useEffect, useRef, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {RootStackParamList, ScreenProps} from "../../src/navigation/types";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import LinearGradient from "react-native-linear-gradient";
import axios from "axios";
import {useAuth} from "../../AuthContext";
import {TaskContext} from "../../TaskContext";
import { useTask } from "../../src/hooks/useTask";
import ConfirmModel from "./ConfirmModel";

type AddTaskNavigationProp = NativeStackNavigationProp<RootStackParamList, "AddTask">;

interface buttonComponentType {
  handleShowSearch: () => void;
  show: boolean;
}
const ButtonScreen = ({handleShowSearch, show}: buttonComponentType) => {
  const navigation1 = useNavigation<AddTaskNavigationProp>();
  const {user} = useAuth();
  const[deleteing,setdeleteing] = useState(false);
  const [modalVisible,setmodalVisible] = useState(false)

  // const context = useContext(TaskContext);
  // if(!context) return null;
  const {fetchTask, taskList} = useTask();

  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim  = useRef(new Animated.Value(1)).current;
  const deleteScaleAnim = useRef(new Animated.Value(1)).current;

  
  useEffect(()=>{

    Animated.parallel([
      Animated.timing(rotateAnim,{
      toValue: show ? 1 : 0,
      duration:500,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver:true
    }),
    Animated.sequence([
      Animated.timing(scaleAnim,{
        toValue:1.5,
        duration:200,
        useNativeDriver:true
      }),
         Animated.timing(scaleAnim,{
        toValue:1,
        duration:200,
        useNativeDriver:true
      })
    ])
    ]).start()
  },[show]);

  const animatedStyle = {
    transform:[
      {
        rotate: rotateAnim.interpolate({
          inputRange:[0,1],
          outputRange:['0deg','180deg']
        })
      },
      {
        scale:scaleAnim
      }
    ]
  }

  const DeleteAnimateStyle = {
    transform:[{scale:deleteScaleAnim}]
  }
  
  const handleNavigate = () => {
    navigation1.replace("AddTask");
  };

  const DeleteAllTask = async() =>{
    setdeleteing(true);

    try {
       await axios.delete(`http://10.0.2.2:8080/Task/DeleteAll/${user?.id}`);
            Alert.alert("Success", "Task Deleted Successfully!");
             fetchTask();
    } catch (error) {
      Alert.alert("Error", "Something Went Wrong..");
    }finally{
      setdeleteing(false)
      setmodalVisible(false)
    }
  }

  const handleDeleteAll = () => {
// setdeleteing(true);
    Animated.sequence([
      Animated.timing(deleteScaleAnim,{
        toValue:1.1,
        duration:500,
        useNativeDriver:true
      }),
      Animated.timing(deleteScaleAnim,{
        toValue:1,
        duration:500,
        useNativeDriver:true
      })
    ]).start()

    if(taskList.length == 0){
      Alert.alert("Warning","You Don't have task");
      return;
    }

    setmodalVisible(true);
    
    // Alert.alert("Delete-All", "Are you sure you want to delete All this task?", [
    //   {text: "Cancel", style: "cancel",onPress:()=>setdeleteing(false)},
    //   {
    //     text: "Delete",
    //     style: "destructive",
    //     onPress: async () => {
    //       try {
    //         await axios.delete(`http://10.0.2.2:8080/Task/DeleteAll/${user?.id}`);
    //         Alert.alert("Success", "Task Deleted Successfully!");
    //          fetchTask();
    //       } catch (error) {
    //         Alert.alert("Error", "Something Went Wrong..");
    //       }finally{
    //         setdeleteing(false)
    //       }
    //     },
    //   },
    // ]);
  };
  return (
    <LinearGradient
      colors={["#667eea", "#764ba2"]}
      style={styles.header}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
    >
      <View style={styles.MainContainer}>
        <ScrollView
          horizontal
          style={{paddingHorizontal: 15, gap: 20}}
          showsHorizontalScrollIndicator={false}
        >
          <View style={{flexDirection: "row", justifyContent: "space-around"}}>
            <TouchableOpacity style={styles.searchbtn} onPress={handleNavigate}>
              {/* <Text style={styles.SearchText1}>Create</Text> */}
              <LinearGradient
                colors={["#ff6b6b", "#ee5a24"]}
                style={styles.buttonGradient}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
              >
                <Text style={styles.createButtonText}>✨ Create</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.searchbtn} onPress={handleShowSearch}>

              <LinearGradient
                colors={show ? ["#ff9ff3", "#f368e0"] : ["#74b9ff", "#0984e3"]}
                style={styles.buttonGradient}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
              >
                <Animated.View style={animatedStyle}>
                <Text style={styles.searchButtonText}>{show ? "❌" : "🔍"}</Text>
                </Animated.View>
                <Text style={styles.searchButtonText}>{show ? "Close" : "Search"}</Text>
              </LinearGradient>
            </TouchableOpacity>

           <Animated.View style={DeleteAnimateStyle}>
             <TouchableOpacity style={styles.searchbtn} disabled={deleteing} onPress={handleDeleteAll}>
              {/* <Text style={styles.SearchText1}>Create</Text> */}
              <LinearGradient
                colors={["#ff6b6b", "#ee5a24"]}
                style={styles.buttonGradient}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
              >
                {
                  deleteing ? 
                  <ActivityIndicator size="small" color="red"/>
                  :
                  <Text style={styles.createButtonText}>🗑️ 'Delete-All</Text>
                }
              </LinearGradient>
            </TouchableOpacity>
           </Animated.View>

           <ConfirmModel 
           visible={modalVisible}
           title="⚠️ Confirm Delete"
           message="Are you sure you want to delete all tasks?"
           confirmText="Delete"
           cancelText="Cancel"
           loading={deleteing}
           onCancel={()=>setmodalVisible(false)}
           onConfirm={DeleteAllTask}
           />
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

export default ButtonScreen;

const styles = StyleSheet.create({
  touchable: {
    borderWidth: 2,
    borderColor: "black",
    padding: 5,
    backgroundColor: "black",
    borderRadius: 16,
    paddingHorizontal: 15,
  },
  text: {
    color: "white",
    fontSize: 18,
  },
  searchbtn: {
    borderWidth: 1,
    // borderColor: "black",
    // paddingVertical: 10,
    // paddingHorizontal: 13,
    backgroundColor: "#667eea",
    borderRadius: 15,
    marginRight: 20,
  },
  SearchText1: {
    // textAlign:"center",
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  MainContainer: {
    justifyContent: "center",
    // padding: 15,
    // borderWidth: 1,
    // borderBottomColor: "black",
    // borderTopRightRadius: 20,
    // borderTopLeftRadius: 20,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    marginTop: 5,
    // borderTopLeftRadius: 25,
    // borderTopRightRadius: 25,
    borderRadius: 25,
  },
  createButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2,
  },
  buttonGradient: {
    paddingVertical: 18,
    paddingHorizontal: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 50,
    borderRadius: 15,
  },
  searchButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    marginLeft: 5,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2,
  },
});

// import {StyleSheet, Text, TouchableOpacity, View, ScrollView, Dimensions} from "react-native";
// import React, {useRef, useState} from "react";
// import {useNavigation} from "@react-navigation/native";
// import {RootStackParamList, ScreenProps} from "../../src/navigation/types";
// import {NativeStackNavigationProp} from "@react-navigation/native-stack";
// import LinearGradient from "react-native-linear-gradient";

// const {width} = Dimensions.get('window');

// type AddTaskNavigationProp = NativeStackNavigationProp<RootStackParamList, "AddTask">;

// interface buttonComponentType {
//   handleShowSearch: () => void;
//   show: boolean;
//   handleDeleteAll: () => void; // New prop for delete all functionality
// }

// const ButtonScreen = ({handleShowSearch, show, handleDeleteAll}: buttonComponentType) => {
//   const navigation1 = useNavigation<AddTaskNavigationProp>();
//   const scrollViewRef = useRef<ScrollView>(null);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handleNavigate = () => {
//     navigation1.replace("AddTask");
//   };

//   const handleScroll = (event: any) => {
//     const scrollPosition = event.nativeEvent.contentOffset.x;
//     const index = Math.round(scrollPosition / (width - 40));
//     setCurrentIndex(index);
//   };

//   const scrollToIndex = (index: number) => {
//     scrollViewRef.current?.scrollTo({
//       x: index * (width - 40),
//       animated: true,
//     });
//   };

//   const buttons = [
//     {
//       id: 'create',
//       title: '✨ Create',
//       colors: ["#ff6b6b", "#ee5a24"],
//       onPress: handleNavigate,
//     },
//     {
//       id: 'search',
//       title: show ? '❌ Close' : '🔍 Search',
//       colors: show ? ["#ff9ff3", "#f368e0"] : ["#74b9ff", "#0984e3"],
//       onPress: handleShowSearch,
//     },
//     {
//       id: 'delete',
//       title: '🗑️ Delete All',
//       colors: ["#e74c3c", "#c0392b"],
//       onPress: handleDeleteAll,
//     },
//   ];

//   return (
//     <LinearGradient
//       colors={["#667eea", "#764ba2"]}
//       style={styles.header}
//       start={{x: 0, y: 0}}
//       end={{x: 1, y: 1}}
//     >
//       <View style={styles.MainContainer}>
//         {/* Swipe Container */}
//         <ScrollView
//           ref={scrollViewRef}
//           horizontal
//           pagingEnabled
//           showsHorizontalScrollIndicator={false}
//           onMomentumScrollEnd={handleScroll}
//           contentContainerStyle={styles.scrollContainer}
//           style={styles.scrollView}
//           decelerationRate="fast"
//           snapToInterval={width - 40}
//           snapToAlignment="center"
//         >
//           {buttons.map((button, index) => (
//             <View key={button.id} style={[styles.buttonContainer, {width: width - 40}]}>
//               <TouchableOpacity
//                 style={styles.swipeButton}
//                 onPress={button.onPress}
//                 activeOpacity={0.8}
//               >
//                 <LinearGradient
//                   colors={button.colors}
//                   style={styles.buttonGradient}
//                   start={{x: 0, y: 0}}
//                   end={{x: 1, y: 1}}
//                 >
//                   <Text style={styles.buttonText}>{button.title}</Text>
//                 </LinearGradient>
//               </TouchableOpacity>
//             </View>
//           ))}
//         </ScrollView>

//         {/* Pagination Dots */}
//         <View style={styles.paginationContainer}>
//           {buttons.map((_, index) => (
//             <TouchableOpacity
//               key={index}
//               style={[
//                 styles.paginationDot,
//                 currentIndex === index && styles.activeDot
//               ]}
//               onPress={() => scrollToIndex(index)}
//             />
//           ))}
//         </View>

//         {/* Swipe Indicator */}
//         <View style={styles.swipeIndicator}>
//           <Text style={styles.swipeText}>
//             {currentIndex < buttons.length - 1 ? '← Swipe for more →' : '← Swipe back'}
//           </Text>
//         </View>
//       </View>
//     </LinearGradient>
//   );
// };

// export default ButtonScreen;

// const styles = StyleSheet.create({
//   header: {
//     paddingHorizontal: 20,
//     paddingTop: 20,
//     paddingBottom: 30,
//     marginTop: 5,
//     borderRadius: 25,
//     elevation: 10,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 5,
//     },
//     shadowOpacity: 0.34,
//     shadowRadius: 6.27,
//   },
//   MainContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   scrollView: {
//     width: width - 40,
//   },
//   scrollContainer: {
//     alignItems: "center",
//   },
//   buttonContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 20,
//   },
//   swipeButton: {
//     borderRadius: 20,
//     width: '90%',
//     maxWidth: 280,
//     overflow: "hidden",
//     elevation: 8,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: 4.65,
//   },
//   buttonGradient: {
//     paddingVertical: 18,
//     paddingHorizontal: 25,
//     alignItems: "center",
//     justifyContent: "center",
//     minHeight: 60,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "700",
//     textAlign: "center",
//     textShadowColor: "rgba(0, 0, 0, 0.3)",
//     textShadowOffset: {width: 0, height: 1},
//     textShadowRadius: 2,
//   },
//   paginationContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 15,
//     marginBottom: 5,
//   },
//   paginationDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: "rgba(255, 255, 255, 0.4)",
//     marginHorizontal: 4,
//   },
//   activeDot: {
//     backgroundColor: "rgba(255, 255, 255, 0.9)",
//     transform: [{scale: 1.2}],
//   },
//   swipeIndicator: {
//     marginTop: 5,
//   },
//   swipeText: {
//     color: "rgba(255, 255, 255, 0.7)",
//     fontSize: 12,
//     fontWeight: "500",
//     textAlign: "center",
//   },
// });

// import {StyleSheet, Text, TouchableOpacity, View, Animated, Dimensions} from "react-native";

// import React, {useRef, useEffect} from "react";
// import {useNavigation} from "@react-navigation/native";
// import {RootStackParamList, ScreenProps} from "../../src/navigation/types";
// import {NativeStackNavigationProp} from "@react-navigation/native-stack";
// import LinearGradient from "react-native-linear-gradient";

// const {width} = Dimensions.get('window');

// type AddTaskNavigationProp = NativeStackNavigationProp<RootStackParamList, "AddTask">;

// interface buttonComponentType {
//   handleShowSearch: () => void;
//   show: boolean;
// }

// const ButtonScreen = ({handleShowSearch, show}: buttonComponentType) => {
//   const navigation1 = useNavigation<AddTaskNavigationProp>();
//   const scaleAnim = useRef(new Animated.Value(1)).current;
//   const rotateAnim = useRef(new Animated.Value(0)).current;
//   const searchScaleAnim = useRef(new Animated.Value(1)).current;

//   const handleNavigate = () => {
//     // Button press animation
//     Animated.sequence([
//       Animated.timing(scaleAnim, {
//         toValue: 0.95,
//         duration: 100,
//         useNativeDriver: true,
//       }),
//       Animated.timing(scaleAnim, {
//         toValue: 1,
//         duration: 100,
//         useNativeDriver: true,
//       }),
//     ]).start();

//     navigation1.replace("AddTask");
//   };

//   const handleSearchPress = () => {
//     // Search button animation
//     Animated.sequence([
//       Animated.timing(searchScaleAnim, {
//         toValue: 0.95,
//         duration: 100,
//         useNativeDriver: true,
//       }),
//       Animated.timing(searchScaleAnim, {
//         toValue: 1,
//         duration: 100,
//         useNativeDriver: true,
//       }),
//     ]).start();

//     handleShowSearch();
//   };

//   // Rotate animation for search icon
//   useEffect(() => {
//     Animated.timing(rotateAnim, {
//       toValue: show ? 1 : 0,
//       duration: 300,
//       useNativeDriver: true,
//     }).start();
//   }, [show]);

//   const rotateInterpolate = rotateAnim.interpolate({
//     inputRange: [0, 1],
//     outputRange: ['0deg', '180deg'],
//   });

//   return (
//     <LinearGradient
//       colors={["#667eea", "#764ba2", "#f093fb"]}
//       style={styles.header}
//       start={{x: 0, y: 0}}
//       end={{x: 1, y: 1}}
//     >
//       <View style={styles.MainContainer}>
//         <View style={styles.buttonContainer}>
//           {/* Create Button */}
//           <Animated.View style={[styles.buttonWrapper, {transform: [{scale: scaleAnim}]}]}>
//             <TouchableOpacity
//               style={[styles.createButton, styles.shadowEffect]}
//               onPress={handleNavigate}
//               activeOpacity={0.8}
//             >
//               <LinearGradient
//                 colors={["#ff6b6b", "#ee5a24"]}
//                 style={styles.buttonGradient}
//                 start={{x: 0, y: 0}}
//                 end={{x: 1, y: 1}}
//               >
//                 <Text style={styles.createButtonText}>✨ Create</Text>
//               </LinearGradient>
//             </TouchableOpacity>
//           </Animated.View>

//           {/* Search Button */}
//           <Animated.View style={[styles.buttonWrapper, {transform: [{scale: searchScaleAnim}]}]}>
//             <TouchableOpacity
//               style={[styles.searchButton, styles.shadowEffect]}
//               onPress={handleSearchPress}
//               activeOpacity={0.8}
//             >
//               <LinearGradient
//                 colors={show ? ["#ff9ff3", "#f368e0"] : ["#74b9ff", "#0984e3"]}
//                 style={styles.buttonGradient}
//                 start={{x: 0, y: 0}}
//                 end={{x: 1, y: 1}}
//               >
//                 <Animated.View style={{transform: [{rotate: rotateInterpolate}]}}>
//                   <Text style={styles.searchButtonText}>
//                     {show ? "❌" : "🔍"}
//                   </Text>
//                 </Animated.View>
//                 <Text style={styles.searchButtonText}>
//                   {show ? "Close" : "Search"}
//                 </Text>
//               </LinearGradient>
//             </TouchableOpacity>
//           </Animated.View>
//         </View>

//         {/* Decorative elements */}
//         {/* <View style={styles.decorativeContainer}>
//           <View style={styles.decorativeDot1} />
//           <View style={styles.decorativeDot2} />
//           <View style={styles.decorativeDot3} />
//         </View> */}
//       </View>
//     </LinearGradient>
//   );
// };

// export default ButtonScreen;

// const styles = StyleSheet.create({
//   header: {
//     paddingHorizontal: 20,
//     paddingTop: 25,
//     paddingBottom: 35,
//     marginTop: 5,
//     borderRadius: 30,
//     elevation: 10,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 5,
//     },
//     shadowOpacity: 0.34,
//     shadowRadius: 6.27,
//   },
//   MainContainer: {
//     justifyContent: "center",
//     position: "relative",
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 10,
//   },
//   buttonWrapper: {
//     flex: 1,
//     marginHorizontal: 8,
//   },
//   createButton: {
//     borderRadius: 20,
//     overflow: "hidden",
//     borderWidth: 2,
//     borderColor: "rgba(255, 255, 255, 0.3)",
//   },
//   searchButton: {
//     borderRadius: 20,
//     overflow: "hidden",
//     borderWidth: 2,
//     borderColor: "rgba(255, 255, 255, 0.3)",
//   },
//   buttonGradient: {
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     minHeight: 50,
//   },
//   createButtonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "700",
//     textAlign: "center",
//     textShadowColor: "rgba(0, 0, 0, 0.3)",
//     textShadowOffset: {width: 0, height: 1},
//     textShadowRadius: 2,
//   },
//   searchButtonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "700",
//     textAlign: "center",
//     marginLeft: 5,
//     textShadowColor: "rgba(0, 0, 0, 0.3)",
//     textShadowOffset: {width: 0, height: 1},
//     textShadowRadius: 2,
//   },
//   shadowEffect: {
//     elevation: 8,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: 4.65,
//   },
//   decorativeContainer: {
//     position: "absolute",
//     top: -10,
//     right: 20,
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   decorativeDot1: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: "rgba(255, 255, 255, 0.6)",
//     marginRight: 5,
//   },
//   decorativeDot2: {
//     width: 12,
//     height: 12,
//     borderRadius: 6,
//     backgroundColor: "rgba(255, 255, 255, 0.4)",
//     marginRight: 5,
//   },
//   decorativeDot3: {
//     width: 6,
//     height: 6,
//     borderRadius: 3,
//     backgroundColor: "rgba(255, 255, 255, 0.8)",
//   },
// });
