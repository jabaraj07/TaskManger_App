// TaskFlatList.tsx
import React, {useCallback} from "react";
import {FlatList, View, Text, StyleSheet} from "react-native";
import TaskItem from "./TaskItem";
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

export default function TaskFlatList1({FilterData, handleEdit, handleDelete}: ParameterType) {
  console.log("Render Item");

  /* always the same references */
  const onEdit = useCallback(handleEdit, [handleEdit]);
  const onDelete = useCallback(handleDelete, [handleDelete]);

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
  const renderItem = useCallback(
    ({item, index}) => <TaskItem item={item} index={index} onEdit={onEdit} onDelete={onDelete} />,
    [onEdit, onDelete],
  );
  const ITEM_HEIGHT = 80;

  return (
    <FlatList
      data={FilterData}
      renderItem={renderItem}
      keyExtractor={i => i.id.toString()}
      ListEmptyComponent={<EmptyState />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
      /* ⬇️  remove unless you watch some *other* piece of state */
      /* extraData={FilterData} */
      /* Optional perf knobs when the list is huge */
      //   initialNumToRender={12}
      //   maxToRenderPerBatch={10}
      //   windowSize={7}
      //   removeClippedSubviews
      getItemLayout={(data, index) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
      })}
    />
  );
}
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
