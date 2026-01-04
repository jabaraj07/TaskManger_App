import {
  Alert,
  FlatList,
  InteractionManager,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, {useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import {useAuth} from "../AuthContext";
import axios from "axios";
import LinearGradient from "react-native-linear-gradient";
import {SafeAreaView} from "react-native-safe-area-context";
// import { FlatList, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Colors from "../src/constants/colors";
import {DrawerActions, useNavigation} from "@react-navigation/native";
import TaskScreenHeader from "./TaskScreenComponent/TaskScreenHeader";
import InputContainer from "./TaskScreenComponent/InputContainer";
import TaskFlatList from "../commented/unUsedComponent/TaskFlatList";
import TaskFlatList1 from "../commented/unUsedComponent/TaskFlatList1";
import TaskRecyclerList from "./TaskScreenComponent/TaskRecyclerList";
import ButtonScreen from "./TaskScreenComponent/ButtonScreen";
import useDebounceValue from "../src/hooks/useDebounceValue";
import {RecyclerListView, RecyclerListViewProps} from "recyclerlistview";
import {RecyclerListViewState} from "recyclerlistview/dist/reactnative/core/RecyclerListView";
import {TaskContext} from "../TaskContext";
import { useTask } from "../src/hooks/useTask";
import ConfirmModel from "./TaskScreenComponent/ConfirmModel";

interface TaskItemType {
  id: number;
  task: string;
}

type TaskType = {
  data: TaskItemType[];
  task: string;
  EditId: number | null;
  show: boolean;
  search: string;
  modalvisible:boolean;
  modalId:number|null
};

const TaskScreenContent = () => {
  const navigation = useNavigation();
  const pendingIndex = useRef<number | null>(null);
  // const recyclerMounted = useRef(false);

  // const context = useContext(TaskContext);
  // if (!context) return null;
  const {handleEdit, didJustAdd, setdidJustAdd, EditIndex, setEditIndex, taskList, fetchTask} =
    useTask();

  const ref = useRef<TextInput>(null);

  // const route = useRoute();
  // const {userId, username} = route.params;

  const {user} = useAuth();
  const flatListRef = useRef<FlatList<TaskItemType>>(null);

  type RLV = RecyclerListView<RecyclerListViewProps, RecyclerListViewState>;
  const recyclerRef = useRef<RLV>(null);

  const [TaskData, setTaskData] = useState<TaskType>({
    data: [],
    task: "",
    EditId: null,
    show: false,
    search: "",
    modalvisible:false,
    modalId:null
  });
  const debounceSearch = useDebounceValue(TaskData.search);
  const [isRecyclerReady, setRecyclerReady] = useState(false);

  useEffect(() => {
    ref.current?.focus();
  }, [TaskData.show]);

  useEffect(() => {
    setTaskData(prev => ({...prev, search: debounceSearch}));
  }, [debounceSearch]);

  useEffect(() => {
    fetchTask();
  }, [fetchTask]);

  const filteredData = useMemo(() => {
    const data = debounceSearch.trim().toLowerCase();
    //  const data = TaskData.search.trim().toLowerCase();

    if (!data) return taskList;
    return taskList.filter(item => item.task.toLowerCase().includes(data));
  }, [debounceSearch, taskList, TaskData.search]);

  useEffect(() => {
    if (!isRecyclerReady) return;

    InteractionManager.runAfterInteractions(() => {
      if (EditIndex !== null) {
        console.log("Scroll to EditIndex");
        recyclerRef.current?.scrollToIndex(EditIndex, true);
        setEditIndex(null);
      }
      if (didJustAdd) {
        console.log("Scroll to bottom after add");
        recyclerRef.current?.scrollToIndex(filteredData.length - 1, true);
        setdidJustAdd(false);
      }
    });
  }, [isRecyclerReady, EditIndex, didJustAdd, filteredData.length]);

  const handleUpArrow = () => {
    recyclerRef.current?.scrollToIndex(0, true);
  };

  const handleDelete = useCallback(async (id: number) => {

    setTaskData((pre)=>({...pre,modalvisible:true,modalId:id}))
    // Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
    //   {text: "Cancel", style: "cancel"},
    //   {
    //     text: "Delete",
    //     style: "destructive",
    //     onPress: async () => {
    //       const DeleteLink =
    //         Platform.OS == "web"
    //           ? `http://localhost:8080/Task/Delete/${id}`
    //           : `http://10.0.2.2:8080/Task/Delete/${id}`;
    //       try {
    //         await axios.delete(DeleteLink);
    //         Alert.alert("Success", "Task deleted successfully!");
    //         fetchTask();
    //       } catch (error) {
    //         console.log(error);
    //         Alert.alert("Error", "Failed to delete task");
    //       }
    //     },
    //   },
    // ]);
  }, []);

  const DeleteSingleTask = async()=>{
    try {
        const DeleteLink =
            Platform.OS == "web"
              ? `http://localhost:8080/Task/Delete/${TaskData.modalId}`
              : `http://10.0.2.2:8080/Task/Delete/${TaskData.modalId}`;
      await axios.delete(DeleteLink);
            Alert.alert("Success", "Task deleted successfully!");
            fetchTask();
    } catch (error) {
      Alert.alert(error);
    }finally{
      setTaskData((pre)=>({...pre,modalId:null,modalvisible:false}))
    }
  }

  const handleShowSearch = useCallback(() => {
    setTaskData(pre => ({...pre, show: !TaskData.show, search: ""}));
  }, [TaskData.show]);

  const handleCloseSearch = () => {
    setTaskData(pre => ({...pre, search: ""}));
  };



  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />

      {/* Header */}
      <TaskScreenHeader
        user={user}
        data={taskList}
      />

      <ButtonScreen handleShowSearch={handleShowSearch} show={TaskData.show} />

      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {TaskData.show && (
          <View style={{paddingHorizontal: 15, paddingVertical: 10, marginTop: 10}}>
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
              <TextInput
                ref={ref}
                placeholder="Enter Search.."
                placeholderTextColor="#888"
                style={styles.searchInput}
                value={TaskData.search}
                onChangeText={e => setTaskData(pre => ({...pre, search: e}))}
              />
              {/* <Button title="Cancel" onPress={handleCloseSearch} /> */}
              <TouchableOpacity
                onPress={handleCloseSearch}
                style={styles.SearchButton}
                activeOpacity={0.7}
              >
                <Text style={styles.SearchText}>Clear</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Input Section...  */}

        {filteredData.length >= 0 && (
          <TaskRecyclerList
            ref={recyclerRef}
            FilterData={filteredData}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            onMount={() => setRecyclerReady(true)}
          />
        )}
        <View style={{position: "absolute", bottom: 10, right: 5}}>
          <TouchableOpacity onPress={handleUpArrow} activeOpacity={0.7}>
            <Text style={{fontSize: 35, color: "red", padding: 10, elevation: 5}}>⬆️</Text>
          </TouchableOpacity>
        </View>

        <ConfirmModel 
        visible={TaskData.modalvisible}
        title="Delete Task"
        message="Are you sure you want to delete this task?"
        confirmText="Delete"
        cancelText="Cancel"
        onCancel={()=>setTaskData((pre)=>({...pre,modalvisible:false}))}
        onConfirm={DeleteSingleTask}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default TaskScreenContent;

const styles = StyleSheet.create({
  container: { //yes
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
    content: { //yes
    flex: 1,
  },
    searchInput: { //yes
    borderWidth: 2,
    borderColor: "black",
    flex: 1,
    marginRight: 10,
    borderRadius: 15,
  },
  
  SearchButton: { //yes
    borderRadius: 10,
    borderColor: "black",

    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 2,
    backgroundColor: "#e63946",
    justifyContent: "center",
    alignItems: "center",
  },
  SearchText: { //yes
    // textAlign:"center",
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
