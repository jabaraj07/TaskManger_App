// import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
// import React from "react";
// import {FlatList} from "react-native-gesture-handler";
// import LinearGradient from "react-native-linear-gradient";
// import Colors from "../../src/constants/colors";

// interface TaskItemType {
//   id: number;
//   task: string;
// }

// interface ParameterType {
//   FilterData: TaskItemType[];
//   handleEdit: (id: number, task: string) => void;
//   handleDelete: (id: number) => Promise<void>;
// }

// const EmptyState = () => (
//   <View style={styles.emptyContainer}>
//     <View style={styles.emptyIconContainer}>
//       <Text style={styles.emptyIcon}>📝</Text>
//     </View>
//     <Text style={styles.emptyTitle}>No Tasks Yet</Text>
//     <Text style={styles.emptySubtitle}>
//       Add your first task to get started with your productivity journey!
//     </Text>
//   </View>
// );

// const TaskFlatList = ({FilterData, handleEdit, handleDelete}: ParameterType) => {
//   console.log("Flatlist...");

//   const TaskItem = ({item, index, handleDelete, handleEdit}) => {
//     // const cardColors = [
//     //   ["#667eea", "#764ba2"],
//     //   ["#f093fb", "#f5576c"],
//     //   ["#4facfe", "#00f2fe"],
//     //   ["#43e97b", "#38f9d7"],
//     //   ["#f12711", "#f5af19"],
//     //   ["#2980B9", "#6DD5FA"],
//     //   ["#ED213A", "#93291E"],
//     //   ["#833ab4", "#fd1d1d", "#fcb045"],
//     // ];

//     // const gradientColors = cardColors[index % cardColors.length];

//     const gradientColors = React.useMemo(() => {
//       const cardColors = [
//         ["#667eea", "#764ba2"],
//         ["#f093fb", "#f5576c"],
//         ["#4facfe", "#00f2fe"],
//         ["#43e97b", "#38f9d7"],
//         ["#f12711", "#f5af19"],
//         ["#2980B9", "#6DD5FA"],
//         ["#ED213A", "#93291E"],
//         ["#833ab4", "#fd1d1d", "#fcb045"],
//       ];
//       return cardColors[index % cardColors.length];
//     }, [index]);

//     return (
//       // <LinearGradient colors={["#667eea", "#764ba2"]} style={styles.wrapper}>
//       <View style={{flex: 1}}>
//         <View style={[styles.taskCard, {marginTop: index === 0 ? 20 : 12}]}>
//           <LinearGradient
//             colors={gradientColors}
//             style={styles.taskGradient}
//             start={{x: 0, y: 0}}
//             end={{x: 1, y: 1}}
//           >
//             <View style={styles.taskHeader}>
//               <View style={styles.taskBadge}>
//                 <Text style={styles.taskBadgeText}>#{index + 1}</Text>
//               </View>
//               <View style={styles.taskActions}>
//                 <TouchableOpacity
//                   style={styles.actionIcon}
//                   onPress={() => handleEdit(item.id, item.task)}
//                   activeOpacity={0.7}
//                 >
//                   <Text style={styles.actionIconText}>Edit</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={styles.actionIcon}
//                   onPress={() => handleDelete(item.id)}
//                   activeOpacity={0.7}
//                 >
//                   <Text style={styles.actionIconText}>Delete</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>

//             <View style={styles.taskMainContent}>
//               <Text style={styles.taskTitle} numberOfLines={4}>
//                 {item.task}
//               </Text>
//             </View>

//             <View style={styles.taskFooter}>
//               <View style={styles.taskStatusDot} />
//               <Text style={styles.taskStatusText}>Active</Text>
//             </View>
//           </LinearGradient>
//         </View>
//       </View>
//       // </LinearGradient>
//     );
//   };
//   return (
//     <FlatList
//       data={FilterData}
//       renderItem={({item, index}) => (
//         <TaskItem item={item} index={index} handleEdit={handleEdit} handleDelete={handleDelete} />
//       )}
//       keyExtractor={item => item.id.toString()}
//       ListEmptyComponent={<EmptyState />}
//       showsVerticalScrollIndicator={false}
//       contentContainerStyle={styles.listContainer}
//       // extraData={FilterData}
//     />
//   );
// };

// export default React.memo(TaskFlatList);

// const styles = StyleSheet.create({
//   emptyContainer: {
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 60,
//     paddingHorizontal: 40,
//   },
//   listContainer: {
//     paddingHorizontal: 20,
//     paddingBottom: 20,
//   },
//   taskStatusText: {
//     color: "rgba(255,255,255,0.9)",
//     fontSize: 12,
//     fontWeight: "500",
//     textShadowColor: "rgba(0,0,0,0.2)",
//     textShadowOffset: {width: 0, height: 1},
//     textShadowRadius: 1,
//   },
//   taskStatusDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: "rgba(255,255,255,0.8)",
//     marginRight: 8,
//   },
//   taskFooter: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   taskTitle: {
//     fontSize: 18,
//     color: "white",
//     fontWeight: "600",
//     lineHeight: 24,
//     textShadowColor: "rgba(0,0,0,0.2)",
//     textShadowOffset: {width: 0, height: 1},
//     textShadowRadius: 2,
//   },
//   taskMainContent: {
//     flex: 1,
//     justifyContent: "center",
//     marginBottom: 15,
//   },
//   actionIconText: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "white",
//   },
//   actionIcon: {
//     // width: 36,
//     // height: 36,
//     borderRadius: 18,
//     padding: 10,
//     backgroundColor: "rgba(255,255,255,0.25)",
//     alignItems: "center",
//     justifyContent: "center",
//     borderWidth: 1,
//     borderColor: "rgba(0, 0, 0, 0.3)",
//   },
//   taskActions: {
//     flexDirection: "row",
//     gap: 8,
//   },
//   taskBadgeText: {
//     color: "white",
//     fontSize: 12,
//     fontWeight: "bold",
//     textShadowColor: "rgba(0,0,0,0.2)",
//     textShadowOffset: {width: 0, height: 1},
//     textShadowRadius: 2,
//   },
//   taskBadge: {
//     backgroundColor: "rgba(255,255,255,0.25)",
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 15,
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.3)",
//   },
//   taskHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   taskGradient: {
//     borderRadius: 20,
//     padding: 20,
//     minHeight: 140,
//   },
//   taskCard: {
//     backgroundColor: "white",
//     borderRadius: 15,
//     padding: 15,
//     marginBottom: 12,
//     shadowColor: "#000",
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.08,
//     shadowRadius: 8,
//     elevation: 1,
//     // borderWidth: 1,
//     borderColor: Colors.primaryGradient[0],
//   },
//   emptyIconContainer: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     backgroundColor: "#f1f3f4",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 20,
//   },
//   emptyIcon: {
//     fontSize: 32,
//   },
//   emptyTitle: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: "#333",
//     marginBottom: 8,
//     textAlign: "center",
//   },
//   emptySubtitle: {
//     fontSize: 16,
//     color: "#666",
//     textAlign: "center",
//     lineHeight: 22,
//   },
// });

import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {forwardRef} from "react";
import LinearGradient from "react-native-linear-gradient";
import Colors from "../../src/constants/colors";

interface TaskItemType {
  id: number;
  task: string;
}

interface ParameterType {
  FilterData: TaskItemType[];
  handleEdit: (id: number, task: string) => void;
  handleDelete: (id: number) => Promise<void>;
}

const EmptyState = () => (
  <View style={styles.emptyContainer}>
    <View style={styles.emptyIconContainer}>
      <Text style={styles.emptyIcon}>📝</Text>
    </View>
    <Text style={styles.emptyTitle}>No Tasks Yet</Text>
    <Text style={styles.emptySubtitle}>
      Add your first task to get started with your productivity journey!
    </Text>
  </View>
);

const TaskFlatList = forwardRef<FlatList<TaskItemType>, ParameterType>(
  ({FilterData, handleEdit, handleDelete}, ref) => {
    const TaskItem = ({item, index, handleDelete, handleEdit}) => {
      console.log(item);
      
      const gradientColors = React.useMemo(() => {
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
        return cardColors[index % cardColors.length];
      }, [index]);

      return (
        <View style={{flex: 1}}>
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
        </View>
      );
    };

    return (
      <FlatList
        ref={ref}
        data={FilterData}
        renderItem={({item, index}) => (
          <TaskItem item={item} index={index} handleEdit={handleEdit} handleDelete={handleDelete} />
        )}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={<EmptyState />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        getItemLayout={(_, index) => ({
          length: 210,
          offset: 210 * index,
          index,
        })}
      />
    );
  },
);
export default React.memo(TaskFlatList);

const styles = StyleSheet.create({
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  taskStatusText: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 12,
    fontWeight: "500",
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 1,
  },
  taskStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.8)",
    marginRight: 8,
  },
  taskFooter: {
    flexDirection: "row",
    alignItems: "center",
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
  taskMainContent: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 15,
  },
  actionIconText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  actionIcon: {
    // width: 36,
    // height: 36,
    borderRadius: 18,
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.3)",
  },
  taskActions: {
    flexDirection: "row",
    gap: 8,
  },
  taskBadgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2,
  },
  taskBadge: {
    backgroundColor: "rgba(255,255,255,0.25)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  taskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  taskGradient: {
    borderRadius: 20,
    padding: 20,
    minHeight: 140,
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
    // borderWidth: 1,
    borderColor: Colors.primaryGradient[0],
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
});
