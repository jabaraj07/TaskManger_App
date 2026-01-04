// TaskContext.tsx
import axios from "axios";
import React, {createContext, useCallback, useContext, useEffect, useState} from "react";
import {Alert, Platform} from "react-native";
import {useAuth} from "./AuthContext";

interface TaskContextType {
  task: string;
  setTask: (text: string) => void;
  EditId: number | null;
  setEditId: (id: number | null) => void;
  handlesubmit: (navigation?: any) => Promise<void>;
  handleCancel: (navigation?: any) => void;
  handleEdit: (id: number, task: string, navigation: any, index: number) => void;
  didJustAdd: boolean;
  setdidJustAdd: (value: boolean) => void;
  EditIndex: number | null;
  setEditIndex: (index: number | null) => void;
  fetchTask: () => void;
  taskList: TaskItemType[];
  successVisible: boolean;
  setsuccessVisible: (boll: boolean) => void;
  successMessage: string;
  ValueId:number|null;
}

interface TaskItemType {
  id: number;
  task: string;
}

interface ProviderType {
  task: string;
  EditId: number | null;
  taskList: TaskItemType[];
  didJustAdd: boolean;
  EditIndex: number | null;
  successVisible: boolean;
  successMessage: string;
  ValueId:number|null;
}

export const TaskContext = createContext<TaskContextType | null>(null);

export const TaskProvider = ({children}: {children: React.ReactNode}) => {
  const {user} = useAuth();

  const [providerData, setproviderData] = useState<ProviderType>({
    task: "",
    EditId: null,
    taskList: [],
    didJustAdd: false,
    EditIndex: null,
    successVisible: false,
    successMessage: "",
    ValueId:null
  });

  const {task, EditId, taskList, didJustAdd, EditIndex, successVisible, successMessage,ValueId} =
    providerData;

  const setTask = (text: string) => setproviderData(prev => ({...prev, task: text}));

  const setEditId = (id: number | null) => {
    return setproviderData(pre => ({...pre, EditId: id}));
  };

  const setEditIndex = (index: number | null) => {
    return setproviderData(pre => ({...pre, EditIndex: index}));
  };

  const setdidJustAdd = (bool: boolean) => {
    return setproviderData(pre => ({...pre, didJustAdd: bool}));
  };

  const setsuccessVisible = (boll: boolean) => {
    return setproviderData(pre => ({...pre, successVisible: boll}));
  };

  const ToAddLink =
    Platform.OS == "web"
      ? `http://localhost:8080/Task/${user?.name}/Add`
      : `http://10.0.2.2:8080/Task/${user?.name}/Add`;

  const SearchLink =
    user?.id != null
      ? Platform.select({
          web: `http://localhost:8080/Task/Get/${user.id}`,
          default: `http://10.0.2.2:8080/Task/Get/${user.id}`,
        })
      : null;

  const fetchTask = useCallback(async () => {
    if (!SearchLink) return;
    try {
      const response = await axios.get(SearchLink);
      // setTaskList(response.data);
      setproviderData(pre => ({...pre, taskList: response.data}));
    } catch (error) {
      console.error("Fetch error:", error);
      Alert.alert("Error", "Unable to fetch tasks");
    }
  }, [SearchLink]);

  const handleEdit = useCallback((id: number, task: string, navigation: any, index: number) => {
    console.log("Edit function ->  " + id + " task : " + task + " Index : " + index);
    setEditId(id);
    setTask(task);
    setEditIndex(index);
    if (navigation) {
      navigation.replace("AddTask");
    }
  }, []);

  const handlesubmit = useCallback(
    async (navigation?: any): Promise<void> => {
      console.log("Task Screen Submit clicked…");
      const taskData = {task: providerData.task};
      // quick validation
      if (providerData.task.trim() === "") {
        // Alert.alert("Empty Task", "Please enter a task before submitting");
          setproviderData(pre => ({
            ...pre,
            successVisible: true,
            successMessage: "Please enter a task before submitting",
            ValueId:0
          }));
        setTask("");
        return;
      }

      try {
        if (EditId) {
          // update
          const editURL =
            Platform.OS === "web"
              ? `http://localhost:8080/Task/Update/${EditId}`
              : `http://10.0.2.2:8080/Task/Update/${EditId}`;

          await axios.put(editURL, taskData);
          setproviderData(pre => ({
            ...pre,
            successVisible: true,
            successMessage: "Task updated successfully!",
            ValueId:1
          }));
          setEditId(null);
        } else {
          // add
          await axios.post(ToAddLink, taskData);
          setproviderData(pre => ({
            ...pre,
            successVisible: true,
            successMessage: "Task added successfully!",
            ValueId:1
          }));
          setdidJustAdd(true); //for autoscroll
        }

        await fetchTask();

        setTimeout(() => {
          if (navigation) {
            navigation.replace("Task");
            setproviderData(pre => ({...pre, successVisible: false,ValueId:null}));
          }
        }, 1500);

        setTask("");

        //return true;
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 409) {
          Alert.alert("Duplicate Task", "This task already exists for this user");
        } else {
          console.log(err);
          Alert.alert("Error", "Failed to save task");
          //return false;
          return;
        }
      }
      // finally{
      //   setproviderData((pre)=>({...pre,id:null}))
      // }
      setTask("");
    },
    [providerData.task, EditId, ToAddLink, fetchTask],
  );

  const handleCancel = useCallback((navigation?: any) => {
    setTask("");
    setEditId(null);
    if (navigation) {
      navigation.replace("Task");
    }
  }, []);

  const contextValue = {
    task,
    setTask,
    EditId,
    setEditId,
    handleCancel,
    handlesubmit,
    handleEdit,
    didJustAdd,
    setdidJustAdd,
    EditIndex,
    setEditIndex,
    fetchTask,
    taskList,
    successVisible,
    setsuccessVisible,
    successMessage,
    ValueId
  };

  return (
    <TaskContext.Provider
      value={contextValue}
    >
      {children}
    </TaskContext.Provider>
  );
};
