import { View, ActivityIndicator } from "react-native";
import { MyVotesHeader } from "../../components/myVotesHeader";
import { Feed } from "../../components/feed";
import { Stack } from "expo-router";
import React, { useState, useEffect } from "react";
import { userExample } from "../../example-data/polls-example";

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState("Votadas");
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryChanged = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await fetch(
          'http://129.146.38.202:3000/obtener-votaciones-creadas-por-usuario/67c79925289d45ed6e584a27'
        );
        const rawData = await response.json();

        if (!response.ok) {
          console.error("Error body:", rawData);
          throw new Error("Error al obtener votaciones");
        }

        const adaptedPolls = rawData.map(poll => ({
          id: poll._id,
          idUsuarioCreador: poll.idUsuarioCreador,
          categoria: poll.categorias && poll.categorias.length > 0 ? poll.categorias[0] : "Sin categoría",
          titulo: poll.titulo,
          descripcion: poll.descripcion,
          tipo: poll.tipo,
          fechaInicio: poll.fechaInicio,
          fechaFin: poll.fechaFin,
          estado: poll.estado,
          imagen: poll.imagen,
        }));

        setPolls(adaptedPolls);
      } catch (error) {
        console.error("Error al cargar votaciones:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPolls();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Stack.Screen
        options={{
          header: () => <MyVotesHeader onCategoryChanged={categoryChanged} />,
        }}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <Feed data={polls} />
      )}
    </View>
  );
}
