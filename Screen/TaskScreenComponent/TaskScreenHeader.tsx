import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import LinearGradient from "react-native-linear-gradient";
import {DrawerActions} from "@react-navigation/native";

type User = {
  id: number;
  name: string;
};

interface TaskItemType {
  id: number;
  task: string;
}

type parameterType = {
  user: User | null;
  data: TaskItemType[];
};

const TaskScreenHeader = ({user, data}: parameterType) => {
  console.log("Header...");

  return (
    <LinearGradient
      colors={["#667eea", "#764ba2"]}
      style={styles.header}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
    >
      <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>

        <Text style={styles.headerTitle}>My Tasks</Text>

           <View style={styles.taskCounter}>
        <Text style={styles.taskCountText}>
          {data.length} {data.length === 1 ? "Task" : "Tasks"}
        </Text>
      </View>
      </View>
      <Text style={styles.headerSubtitle}>Welcome back, {user?.name}!</Text>
   
    </LinearGradient>
  );
};

export default React.memo(TaskScreenHeader);

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  searchbtn: {
    borderWidth: 1,
    borderColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 13,
    backgroundColor: "white",
    borderRadius: 15,
  },
  SearchText1: {
    // textAlign:"center",
    color: "black",
    fontSize: 16,
    fontWeight: "600",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
    marginBottom: 15,
  },
  taskCounter: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  taskCountText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
});
