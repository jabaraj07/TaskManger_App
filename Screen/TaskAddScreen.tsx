import {Button, StyleSheet, Text, View, StatusBar, SafeAreaView} from "react-native";
import React, {useContext, useEffect} from "react";
import {RootStackParamList, ScreenProps} from "../src/navigation/types";
import InputContainer from "./TaskScreenComponent/InputContainer";
import {RouteProp, useRoute} from "@react-navigation/native";
import {TaskContext} from "../TaskContext";
import {useTask} from "../src/hooks/useTask";
import SuccessModel from "./TaskScreenComponent/SuccessModel";

// type AddTaskRouteProp = RouteProp<RootStackParamList, "AddTask">;

const TaskAddScreen = ({navigation}: ScreenProps<"AddTask">) => {
  // const { params } = useRoute<AddTaskRouteProp>();

  // const context = useContext(TaskContext);
  // if (!context) return null;
  const {task, setTask, handlesubmit, handleCancel, handleEdit, EditId, setEditId,successVisible,setsuccessVisible,successMessage,ValueId} = useTask();

  const handleBackButton = () => {
    navigation.replace("Task");
    setEditId(null);
    setTask("");
  };

//   useEffect(() => {
//   if (successVisible) {
//     const timeout = setTimeout(() => setsuccessVisible(false), 3000);
//     return () => clearTimeout(timeout);
//   }
// }, [successVisible]);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#667eea" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>{EditId ? "Edit Task" : "Add New Task"}</Text>
        <Text style={styles.headerSubtitle}>
          {EditId ? "Update your task details" : "Create a new task to stay organized"}
        </Text>
      </View>

      <View style={styles.content}>
        <InputContainer
          EditId={EditId}
          task={task}
          handlesubmit={handlesubmit}
          handleCancel={handleCancel}
          settask={setTask}
        />
      </View>

      <View style={styles.footer}>
        <View style={styles.buttonContainer}>
          <Button title="Back to Task" onPress={handleBackButton} color="#007AFF" />
        </View>
      </View>

      <SuccessModel 
      visible={successVisible}
      message={successMessage}
      onClose={()=>setsuccessVisible(false)}
      ValueId={ValueId}
      />

    </SafeAreaView>
  );
};

export default TaskAddScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    backgroundColor: "#667eea",
    borderBottomWidth: 1,
    borderBottomColor: "#5a67d8",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#e2e8f0",
    textAlign: "center",
    lineHeight: 22,
    opacity: 0.9,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#e9ecef",
  },
  buttonContainer: {
    borderRadius: 8,
    overflow: "hidden",
  },
});
