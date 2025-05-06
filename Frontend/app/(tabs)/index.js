import { View, ActivityIndicator, Text } from "react-native";
import { HomeHeader } from "../../components/homeHeader";
import { Feed } from "../../components/feed";
import { Stack } from "expo-router";
import React, { useState, useEffect } from "react";

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState("Populares");
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPolls = async (category) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://129.146.38.202:3000/obtener-votaciones-por-categoria/${category}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al cargar las votaciones');
      }

      const processedData = data.map((p) => ({
        ...p,
        id: p._id,
      }));

      setPolls(processedData);
    } catch (error) {
      console.error("Error fetching polls:", error);
      setError(error.message);
      setPolls([]);
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
      ) : error ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'red' }}>{error}</Text>
        </View>
      ) : polls.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>No hay votaciones disponibles en esta categoría</Text>
        </View>
      ) : (
        <Feed data={polls} />
      )}
    </View>
  );
}
