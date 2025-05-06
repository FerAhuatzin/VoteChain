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
        const pollRes = await fetch(`http://129.146.38.202:3000/obtener-votacion/${pollId}`);
        const pollData = await pollRes.json();

        console.log("DEBUG pollData:", pollData);;
        setPoll(pollData);


        const opcionesRes = await fetch(`http://129.146.38.202:3000/obtener-opciones/${pollId}`);
        const opcionesData = await opcionesRes.json();

        const votesRes = await fetch(`http://129.146.38.202:3000/conteo/${pollId}`);
        console.log("DEBUG votesRes status:", votesRes.status);
        const votesData = await votesRes.json();
        console.log("DEBUG votesData raw:", votesData);
        
        if (!votesData || typeof votesData !== 'object') {
          console.error("votesData no es un objeto válido:", votesData);
          setVotes({ idVotacion: pollId, opciones: opcionesData.map(opcion => ({
            _id: opcion._id,
            descripcion: opcion.descripcion,
            votos: 0
          }))});
          return;
        }

        const opcionesConVotos = Array.isArray(opcionesData)
        ? opcionesData.map((opcion) => {
            const opcionId = opcion._id.toString();
            const hexId = '0x' + opcionId;
            console.log("DEBUG opcionId:", opcionId);
            console.log("DEBUG hexId:", hexId);
            console.log("DEBUG votesData keys:", Object.keys(votesData));
            console.log("DEBUG votesData[hexId]:", votesData[hexId]);
            return {
              _id: opcion._id,
              descripcion: opcion.descripcion,
              votos: votesData[hexId] || 0,
            };
          })
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
