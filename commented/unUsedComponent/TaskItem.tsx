import React from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import LinearGradient from "react-native-linear-gradient";

const CARD_COLORS = [
  ["#667eea", "#764ba2"],
  ["#f093fb", "#f5576c"],
  ["#4facfe", "#00f2fe"],
  ["#43e97b", "#38f9d7"],
  ["#f12711", "#f5af19"],
  ["#2980B9", "#6DD5FA"],
  ["#ED213A", "#93291E"],
  ["#833ab4", "#fd1d1d", "#fcb045"],
] as const;

interface ItemProps {
  item: {id: number; task: string};
  index: number;
  onEdit: (id: number, task: string) => void;
  onDelete: (id: number) => void;
}

function TaskItem({item, index, onEdit, onDelete}: ItemProps) {
  const gradient = CARD_COLORS[index % CARD_COLORS.length];

  return (
    <View style={[styles.card, {marginTop: index === 0 ? 20 : 12}]}>
      <LinearGradient
        colors={[...gradient]}
        style={styles.gradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
      >
        {/* header */}
        <View style={styles.header}>
          <View style={styles.badge}>
            <Text style={styles.badgeTxt}>#{index + 1}</Text>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => onEdit(item.id, item.task)}
              activeOpacity={0.7}
            >
              <Text style={styles.actionTxt}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => onDelete(item.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.actionTxt}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* task content */}
        <Text style={styles.title} numberOfLines={4}>
          {item.task}
        </Text>

        {/* footer */}
        <View style={styles.footer}>
          <View style={styles.dot} />
          <Text style={styles.status}>Active</Text>
        </View>
      </LinearGradient>
    </View>
  );
}

export default React.memo(TaskItem);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    // padding: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 1,
  },
  gradient: {
    borderRadius: 20,
    padding: 20,
    minHeight: 140,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  badge: {
    backgroundColor: "rgba(255,255,255,0.25)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  badgeTxt: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  actionBtn: {
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.3)",
  },
  actionTxt: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  title: {
    fontSize: 18,
    color: "white",
    fontWeight: "600",
    lineHeight: 24,
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2,
    marginBottom: 15,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.8)",
    marginRight: 8,
  },
  status: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 12,
    fontWeight: "500",
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 1,
  },
});
