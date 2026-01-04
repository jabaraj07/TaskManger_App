import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  Modal,
} from "react-native";
import React, {useEffect, useState} from "react";
import axios, {AxiosError} from "axios";
import {useRoute} from "@react-navigation/native";
import {FlatList, TextInput} from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import Colors from "../src/constants/colors";

import {ScreenProps} from "../src/navigation/types";
import {useAuth} from "../AuthContext";
const {width, height} = Dimensions.get("window");

interface TaskItemType {
  id: number;
  task: string;
}

type SortOption = "newest" | "oldest" | "alphabetical";

const TaskScreenUpdated = ({navigation, route}: ScreenProps<"Task">) => {
  const {user} = useAuth();
  const [data, setdata] = useState<TaskItemType[]>([]);
  const [filteredData, setFilteredData] = useState<TaskItemType[]>([]);
  const [task, settask] = useState<string>("");
  const [EditId, setEditId] = useState<number | null>(null);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<SortOption>("newest");

  const SearchLink =
    Platform.OS == "web"
      ? `http://localhost:8080/Task/Get/${user?.id}`
      : `http://10.0.2.2:8080/Task/Get/${user?.id}`;

  const ToAddLink =
    Platform.OS == "web"
      ? `http://localhost:8080/Task/${user?.name}/Add`
      : `http://10.0.2.2:8080/Task/${user?.name}/Add`;

  const fetchTask = async () => {
    try {
      const response = await axios.get(SearchLink);
      console.log(response.data);
      setdata(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.log("Fetch Error : " + error);
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  // Filter and sort tasks based on search query and sort option
  useEffect(() => {
    let filtered = [...data];

    // Apply search filter
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(item =>
        item.task.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Apply sorting
    switch (sortOption) {
      case "newest":
        filtered = filtered.sort((a, b) => b.id - a.id);
        break;
      case "oldest":
        filtered = filtered.sort((a, b) => a.id - b.id);
        break;
      case "alphabetical":
        filtered = filtered.sort((a, b) =>
          a.task.toLowerCase().localeCompare(b.task.toLowerCase()),
        );
        break;
    }

    setFilteredData(filtered);
  }, [data, searchQuery, sortOption]);

  const handlesubmit = async () => {
    console.log("Task Screen Submit clicked...");

    const taskData = {task: task};

    if (task.trim() == "") {
      Alert.alert("Empty Task", "Please enter a task before submitting");
      return;
    }

    if (EditId) {
      const EditLink =
        Platform.OS == "web"
          ? `http://localhost:8080/Task/Update/${EditId}`
          : `http://10.0.2.2:8080/Task/Update/${EditId}`;
      try {
        await axios.put(EditLink, {task: task});
        Alert.alert("Success", "Task updated successfully!");
        fetchTask();
      } catch (error) {
        console.log(error);
        Alert.alert("Error", "Failed to update task");
      }
      setEditId(null);
    } else {
      try {
        await axios.post(ToAddLink, taskData);
        fetchTask();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response && error.response?.status === 409) {
            Alert.alert("Duplicate Task", "This task already exists for this user");
          } else {
            console.log(error);
            Alert.alert("Error", "Failed to add task");
          }
        }
      }
    }
    settask("");
  };

  const handleDelete = async (id: number) => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      {text: "Cancel", style: "cancel"},
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const DeleteLink =
            Platform.OS == "web"
              ? `http://localhost:8080/Task/Delete/${id}`
              : `http://10.0.2.2:8080/Task/Delete/${id}`;
          try {
            await axios.delete(DeleteLink);
            Alert.alert("Success", "Task deleted successfully!");
            fetchTask();
          } catch (error) {
            console.log(error);
            Alert.alert("Error", "Failed to delete task");
          }
        },
      },
    ]);
  };

  const handleEdit = (id: number, task: string) => {
    setEditId(id);
    settask(task);
  };

  const handleCancel = () => {
    setEditId(null);
    settask("");
  };

  const handleMenuOption = (option: "search" | "sort") => {
    setShowMenu(false);
    if (option === "search") {
      setShowSearch(!showSearch);
      if (!showSearch) {
        setSearchQuery("");
      }
    } else if (option === "sort") {
      // Toggle sort options
      const nextSort: SortOption =
        sortOption === "newest" ? "oldest" : sortOption === "oldest" ? "alphabetical" : "newest";
      setSortOption(nextSort);
    }
  };

  const getSortLabel = () => {
    switch (sortOption) {
      case "newest":
        return "Newest First";
      case "oldest":
        return "Oldest First";
      case "alphabetical":
        return "A-Z";
      default:
        return "Sort";
    }
  };

  const TaskItem = ({item, index}: {item: TaskItemType; index: number}) => {
    const cardColors = [
      ["#667eea", "#764ba2"],
      ["#f093fb", "#f5576c"],
      ["#4facfe", "#00f2fe"],
      ["#43e97b", "#38f9d7"],
      ["#f12711", "#f5af19"],
      ["#2980B9", "#6DD5FA"],
      ["#ED213A", "#93291E"],
      ["#833ab4", "#fd1d1d", "#fcb045"],
    ];

    const gradientColors = cardColors[index % cardColors.length];

    return (
      <View style={[styles.taskCard, {marginTop: index === 0 ? 20 : 12}]}>
        <LinearGradient
          colors={gradientColors}
          style={styles.taskGradient}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
        >
          <View style={styles.taskHeader}>
            <View style={styles.taskBadge}>
              <Text style={styles.taskBadgeText}>#{index + 1}</Text>
            </View>
            <View style={styles.taskActions}>
              <TouchableOpacity
                style={styles.actionIcon}
                onPress={() => handleEdit(item.id, item.task)}
                activeOpacity={0.7}
              >
                <Text style={styles.actionIconText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionIcon}
                onPress={() => handleDelete(item.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.actionIconText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.taskMainContent}>
            <Text style={styles.taskTitle} numberOfLines={4}>
              {item.task}
            </Text>
          </View>

          <View style={styles.taskFooter}>
            <View style={styles.taskStatusDot} />
            <Text style={styles.taskStatusText}>Active</Text>
          </View>
        </LinearGradient>
      </View>
    );
  };

  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <Text style={styles.emptyIcon}>📝</Text>
      </View>
      <Text style={styles.emptyTitle}>{searchQuery ? "No Tasks Found" : "No Tasks Yet"}</Text>
      <Text style={styles.emptySubtitle}>
        {searchQuery
          ? `No tasks match "${searchQuery}". Try a different search term.`
          : "Add your first task to get started with your productivity journey!"}
      </Text>
    </View>
  );

  const MenuModal = () => (
    <Modal
      visible={showMenu}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowMenu(false)}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => setShowMenu(false)}
      >
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuOption("search")}
            activeOpacity={0.7}
          >
            <Text style={styles.menuItemText}>🔍 Search</Text>
          </TouchableOpacity>
          {/* <View style={styles.menuDivider} /> */}
          {/* <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuOption("sort")}
            activeOpacity={0.7}
          >
            <Text style={styles.menuItemText}>🔄 Sort ({getSortLabel()})</Text>
          </TouchableOpacity> */}
        </View>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />

      {/* Header */}
      <LinearGradient
        colors={["#667eea", "#764ba2"]}
        style={styles.header}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
      >
        <View style={styles.headerTop}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>My Tasks</Text>
            <Text style={styles.headerSubtitle}>Welcome back, {user?.name}!</Text>
          </View>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => setShowMenu(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.menuButtonText}>⋮</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.taskCounter}>
          <Text style={styles.taskCountText}>
            {filteredData.length} {filteredData.length === 1 ? "Task" : "Tasks"}
            {searchQuery && ` (filtered)`}
          </Text>
        </View>
      </LinearGradient>

      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Search Section */}
        {showSearch && (
          <View style={styles.searchSection}>
            <View style={styles.searchContainer}>
              <TextInput
                placeholder="Search tasks..."
                placeholderTextColor="#999"
                style={styles.searchInput}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <TouchableOpacity
                style={styles.closeSearchButton}
                onPress={() => {
                  setShowSearch(false);
                  setSearchQuery("");
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.closeSearchText}>✕</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Input Section */}
        <View style={styles.inputSection}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder={EditId ? "Edit your task..." : "What needs to be done?"}
              placeholderTextColor="#999"
              style={styles.textInput}
              value={task}
              onChangeText={settask}
              multiline
              maxLength={200}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.primaryButton]}
              onPress={handlesubmit}
              activeOpacity={0.8}
            >
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
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancel}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Task List */}
        <FlatList
          data={filteredData}
          renderItem={({item, index}) => <TaskItem item={item} index={index} />}
          keyExtractor={item => item.id.toString()}
          ListEmptyComponent={<EmptyState />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </KeyboardAvoidingView>

      <MenuModal />
    </SafeAreaView>
  );
};

export default TaskScreenUpdated;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  menuButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
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
  content: {
    flex: 1,
  },
  searchSection: {
    backgroundColor: "white",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#e1e5e9",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#f8f9fa",
  },
  closeSearchButton: {
    marginLeft: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ff4757",
    alignItems: "center",
    justifyContent: "center",
  },
  closeSearchText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
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
  },
  inputContainer: {
    marginBottom: 15,
  },
  textInput: {
    borderWidth: 2,
    borderColor: "#e1e5e9",
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
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  taskGradient: {
    borderRadius: 20,
    padding: 20,
    minHeight: 140,
  },
  taskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  taskBadge: {
    backgroundColor: "rgba(255,255,255,0.25)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  taskBadgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2,
  },
  taskActions: {
    flexDirection: "row",
    gap: 8,
  },
  actionIcon: {
    borderRadius: 18,
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.3)",
  },
  actionIconText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  taskMainContent: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 15,
  },
  taskTitle: {
    fontSize: 18,
    color: "white",
    fontWeight: "600",
    lineHeight: 24,
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2,
  },
  taskFooter: {
    flexDirection: "row",
    alignItems: "center",
  },
  taskStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.8)",
    marginRight: 8,
  },
  taskStatusText: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 12,
    fontWeight: "500",
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 1,
  },
  taskCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 1,
    borderColor: Colors.primaryGradient[0],
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#f1f3f4",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  emptyIcon: {
    fontSize: 32,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },
  // Menu Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: 80,
    paddingRight: 20,
  },
  menuContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    paddingVertical: 8,
    minWidth: 150,
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  menuItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  menuDivider: {
    height: 1,
    backgroundColor: "#e1e5e9",
    marginVertical: 4,
  },
});
