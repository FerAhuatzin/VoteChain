import { View, ActivityIndicator } from "react-native";
import { HomeHeader } from "../../components/homeHeader";
import { Feed } from "../../components/feed";
import { Stack } from "expo-router";
import React, { useState, useEffect } from "react";

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState("Populares");
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPolls = async (category) => {
    setLoading(true);
    try {
      const response = await fetch(`http://192.168.1.5:3000/obtener-votaciones-por-categoria/${category}`);
      const data = await response.json();

  
      const processedData = data.map((p) => ({
        ...p,
        id: p._id,
      }));

      setPolls(processedData);
    } catch (error) {
      console.error("Error fetching polls:", error);
      setPolls([]); // fallback vacío si falla
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolls(selectedCategory);
  }, [selectedCategory]);

  const categoryChanged = (category) => {
    setSelectedCategory(category);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Stack.Screen options={{ header: () => <HomeHeader onCategoryChanged={categoryChanged} /> }} />
      {loading ? (
        <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
      ) : (
        <Feed data={polls} />
      )}
    </View>
  );
}
