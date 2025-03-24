import { View, Image} from "react-native";
import { MyVotesHeader } from "../../components/myVotesHeader";
import { Feed } from "../../components/feed";
import { Stack } from "expo-router";
import React, { useState } from "react";
import { pollsExample } from "../../example-data/polls-example";

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState("Votadas"); 
  // This function is called when the user selects a new category called inside the HomeHeader component
  const categoryChanged = (category) => {
    setSelectedCategory(category);
    //Make the async call to the backend to get the new feed "data" based on the category
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Stack.Screen options={{ header: () => <MyVotesHeader onCategoryChanged={categoryChanged}/> }} />
      <Feed data={pollsExample}/>
    </View>
  );
}
