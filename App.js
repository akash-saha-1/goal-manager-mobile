import React, { useState } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import GoalInput from "./components/GoalInput";
import GoalItem from "./components/GoalItem";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [addModal, showAddModal] = useState(false);
  const addGoalHandler = (goalTitle) => {
    if (goalTitle.length === 0) {
      return false;
    }
    setCourseGoals((currentGoals) => [
      ...currentGoals,
      { id: Math.random(-1000, 1000).toString(), value: goalTitle },
    ]);
    showAddModal(false);
  };
  const removeGoalHandler = (goalId) => {
    setCourseGoals((currentGoals) => {
      return currentGoals.filter((goal) => goal.id !== goalId);
    });
  };
  const cancelGoalHandler = () => {
    showAddModal(false);
  };
  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={() => showAddModal(true)} />
      <GoalInput
        visible={addModal}
        addGoalHandler={addGoalHandler}
        cancelGoalHandler={cancelGoalHandler}
      />
      <FlatList
        data={courseGoals}
        keyExtractor={(item, index) => item.id}
        renderItem={(itemData) => (
          <GoalItem
            id={itemData.item.id}
            onDelete={removeGoalHandler}
            title={itemData.item.value}
          />
        )}
      ></FlatList>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    padding: 50,
    marginBottom: 20,
  },
});
