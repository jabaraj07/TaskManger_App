import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, {useMemo, useRef, useState, useEffect, useCallback, forwardRef} from "react";
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
  RecyclerListViewProps,
} from "recyclerlistview";
import {RecyclerListViewState} from "recyclerlistview/dist/reactnative/core/RecyclerListView";
import { RootStackParamList } from "../../src/navigation/types";

interface TaskItemType {
  id: number;
  task: string;
}

interface Props {
  FilterData: TaskItemType[];
  handleEdit: (id: number, task: string,navigation:any,index:number) => void;
  handleDelete: (id: number) => Promise<void>;
  onMount:()=>void;
}

/* ------------ gradient colour palette ------------- */
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

/* ------------ dimensions ------------- */
const {width: SCREEN_WIDTH} = Dimensions.get("window");
const ITEM_HEIGHT = 182; // 140 minHeight + padding + marginBottom

/* ------------ Task card renderer ------------- */
const TaskCard = React.memo(
  ({
    item,
    index,
    onEdit,
    onDelete,
  }: {
    item: TaskItemType;
    index: number;
    onEdit: Props["handleEdit"];
    onDelete: Props["handleDelete"];
  }) => {

    // const animatedItemIds = new Set();
    const opacity = useRef(new Animated.Value(0)).current;
    const translateX = useRef(new Animated.Value(-100)).current;
    const [hasAnimated, setHasAnimated] = useState(false);

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

      useEffect(() => {
    if (!hasAnimated) {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: 0,
          duration: 300,
          delay: index * 100, 
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          delay: index * 100,
          useNativeDriver: true,
        }),
      ]).start(() => setHasAnimated(true));
    }
  }, [hasAnimated]);

    const gradient = CARD_COLORS[index % CARD_COLORS.length];
    return (
     <Animated.View  
     style={[
      {
         transform: [{ translateX }],
          opacity,
      }
     ]}
     >
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
                onPress={() => onEdit(item.id, item.task,navigation,index)}
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

          {/* body */}
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
     </Animated.View>
    );
  },
  (p, n) => p.item.id === n.item.id && p.item.task === n.item.task && p.index === n.index,
);

type RLV = RecyclerListView<RecyclerListViewProps, RecyclerListViewState>;

const TaskRecyclerList = forwardRef<RLV, Props>(({FilterData, handleEdit, handleDelete,onMount}, ref) => {
  
  // console.log("Recycler...");

  /* 1. DataProvider (tells RLV what rows changed) */
  const [dataProvider, setDataProvider] = useState(() => new DataProvider((r1, r2) => r1 !== r2));

  useEffect(() => {
    setDataProvider(prev => prev.cloneWithRows(FilterData));
  }, [FilterData]);


  /* 2. LayoutProvider (tells RLV width/height) */
  const layoutProvider = useRef(
    new LayoutProvider(
      () => 0, // one view type
      (_, dim) => {
        dim.width = SCREEN_WIDTH;
        dim.height = ITEM_HEIGHT;
      },
    ),
  ).current;

  /* 3. Row renderer */
  const rowRenderer = useCallback(
    (_type: number | string, item: TaskItemType, index: number) => (
      <TaskCard item={item} index={index} onEdit={handleEdit} onDelete={handleDelete} />
    ),
    [handleEdit, handleDelete],
  );

//   console.log("FilterData:", FilterData);
// console.log("Is empty:", FilterData.length === 0);

  /* 4. Empty state (RLV uses renderAhead, so we wrap) */
  if (FilterData.length === 0 || !FilterData) {
    return (
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
  }

  return (
    <RecyclerListView
      ref={ref} 
      dataProvider={dataProvider}
      layoutProvider={layoutProvider}
      rowRenderer={rowRenderer}
      style={{flex: 1}}
      scrollViewProps={{
        contentContainerStyle: {paddingBottom: 20},
        keyboardShouldPersistTaps: "handled",
        decelerationRate: 0.85,
        scrollEventThrottle: 16,
         showsVerticalScrollIndicator: false,
      }}
      onVisibleIndicesChanged={()=>{
        onMount?.()
      }}
    />
  );
});
export default React.memo(TaskRecyclerList);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 1,
    width: "100%",
    justifyContent: "center",
    // alignItems: "center",
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
    paddingVertical: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  badgeTxt: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2,
  },
  actions: {flexDirection: "row", gap: 8},
  actionBtn: {
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(0, 0, 0, 0.3)",
  },
  actionTxt: {fontSize: 18, fontWeight: "bold", color: "white"},
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
  footer: {flexDirection: "row", alignItems: "center"},
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
  /* empty-state styles copied from your original */
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    paddingHorizontal: 40,
    flex:1,
    // backgroundColor:"red"
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
  emptyIcon: {fontSize: 32},
  emptyTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtitle: {fontSize: 16, color: "#666", textAlign: "center", lineHeight: 22},
});
