import { View, Text, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { DetailHeader } from "../../../components/detailHeader";
import { SendBody } from "../../../components/sendDetailBody";
import { Stack } from "expo-router";
import React, { useEffect, useState } from 'react';

export default function Detail() {
  const { pollId } = useLocalSearchParams();
  const [poll, setPoll] = useState(null);
  const [votes, setVotes] = useState({ opciones: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pollId) {
      console.error("pollId está vacío o undefined");
      return;
    }

    const fetchPollData = async () => {
      setLoading(true);
      try {
        // Obtener los detalles de la votación
        const pollRes = await fetch(`http://192.168.1.5:3000/obtener-votacion/6818f146de10047544d641cd`);
        const pollData = await pollRes.json();
        setPoll(pollData);

        // Obtener las opciones de la votación
        const optionsRes = await fetch(`http://192.168.1.5:3000/obtener-opciones/6818f146de10047544d641cd`);
        const optionsData = await optionsRes.json();

        // Guardamos solo el array directamente
        setVotes({ opciones: optionsData });

      } catch (error) {
        console.error("Error cargando detalles:", error);
        setPoll(null);
        setVotes({ opciones: [] });
      } finally {
        setLoading(false);
      }
    };

    fetchPollData();
  }, [pollId]);

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: "white", justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (!poll) {
    return (
      <View style={{ flex: 1, backgroundColor: "white", justifyContent: "center", alignItems: "center" }}>
        <Text>Votación no encontrada</Text>
      </View>
    );
  }
  console.log("DEBUG poll:", poll);
  console.log("DEBUG votes:", votes);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Stack.Screen options={{ header: () => <DetailHeader imagen={poll.imagen} /> }} />
      <SendBody options={votes.opciones} idVotacion={poll.id} /> {/* ✅ Pasamos solo el array aquí */}
    </View>
  );
}
