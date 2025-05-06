import { View, Text, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Stack } from "expo-router";
import React, { useState, useEffect } from 'react';
import { DetailHeader } from "../../components/detailHeader";
import { DetailBody } from "../../components/detailBody";

export default function Detail() {
  const { pollId } = useLocalSearchParams();
  const [poll, setPoll] = useState(null);
  const [votes, setVotes] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("DEBUG pollId:", pollId);

    if (!pollId || typeof pollId !== "string") {
      console.error("pollId inválido:", pollId);
      setLoading(false);
      return;
    }

    const fetchPollDetails = async () => {
      setLoading(true);
      try {
        const pollRes = await fetch(`http://192.168.1.5:3000/obtener-votacion/${pollId}`);
        const pollData = await pollRes.json();

        console.log("DEBUG pollData:", pollData);;
        setPoll(pollData);


        const opcionesRes = await fetch(`http://192.168.1.5:3000/obtener-opciones/${pollId}`);
        const opcionesData = await opcionesRes.json();

        const votesRes = await fetch(`http://192.168.1.5:3000/conteo/${pollId}`);
        const votesData = await votesRes.json();

        const opcionesConVotos = Array.isArray(opcionesData)
          ? opcionesData.map((opcion) => ({
              _id: opcion._id,
              descripcion: opcion.descripcion,
              votos: votesData[opcion._id] || 0,
            }))
          : [];

        setVotes({ idVotacion: pollId, opciones: opcionesConVotos });

      } catch (error) {
        console.error("Error cargando detalles:", error);
        setPoll(null);
        setVotes(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPollDetails();
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

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Stack.Screen options={{ header: () => <DetailHeader imagen={poll.imagen} /> }} />
      <DetailBody
        poll={poll}
        votes={votes}
        user={{ nombre: poll.usuarioCreador || "Desconocido" }}
      />
    </View>
  );
}
