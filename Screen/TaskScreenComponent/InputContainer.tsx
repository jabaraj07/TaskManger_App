import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, { useContext, useEffect, useRef } from "react";
import LinearGradient from "react-native-linear-gradient";
import { TaskContext } from "../../TaskContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../src/navigation/types";

interface parameterType {
  handleCancel: (navigation?:any) => void;
  EditId: number | null;
  task: string;
  settask: (text: string) => void;
  handlesubmit: (navigation?:any) => Promise<void>;
  // handleSearch: (text: string) => void;
}

const InputContainer = ({
  handleCancel,
  EditId,
  handlesubmit,
  task,
  settask
}: parameterType) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  console.log("Input Container....");
  const ref = useRef<TextInput>(null);
      // const {task,setTask} = useContext(TaskContext);    
  useEffect(()=>{
    ref.current?.focus();
  },[])

  return (
    <View style={styles.inputSection}>
      <View style={styles.inputContainer}>
        <TextInput
          ref={ref}
          placeholder={EditId ? "Edit your task..." : "What needs to be done?"}
          placeholderTextColor="#999"
          style={styles.textInput}
          value={task}
          onChangeText={(e)=>settask(e)}
          multiline
          maxLength={80}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.primaryButton]} onPress={()=>handlesubmit(navigation)} activeOpacity={0.8}>
          <LinearGradient
            colors={EditId ? ["#4CAF50", "#45a049"] : ["#667eea", "#764ba2"]}
            style={styles.buttonGradient}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
          >
            <Text style={styles.primaryButtonText}>{EditId ? "Update Task" : "Add Task"}</Text>
          </LinearGradient>
        </TouchableOpacity>

        {EditId && (
          <TouchableOpacity style={styles.cancelButton} onPress={()=>handleCancel(navigation)} activeOpacity={0.7}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default React.memo(InputContainer);

const styles = StyleSheet.create({
  inputSection: {
    backgroundColor: "white",
    margin: 20,
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    width:"90%",
    borderColor:"black",
    borderWidth:1
  },
  inputContainer: {
    marginBottom: 15,
    
  },
  textInput: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#f8f9fa",
    minHeight: 50,
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
  primaryButton: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
    // backgroundColor:"red"
    // borderColor:"red",
    // borderWidth:2
  },
  buttonGradient: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#dc3545",
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: {
    color: "#dc3545",
    fontSize: 16,
    fontWeight: "600",
  },
});
