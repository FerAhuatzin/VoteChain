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
    if (!pollId) {
      console.error("pollId está vacío o undefined");
      return;
    }
  
    const fetchPollDetails = async () => {
      setLoading(true);
      try {
        // 1. Detalles generales
        const pollRes = await fetch(`http://192.168.1.5:3000/obtener-votacion/6818f146de10047544d641cd`);
        const pollData = await pollRes.json();
    
        // 2. Opciones
        const opcionesRes = await fetch(`http://192.168.1.5:3000/obtener-opciones/6818f146de10047544d641cd`);
        const opcionesData = await opcionesRes.json();
    
        // 3. Conteo de votos
        const votesRes = await fetch(`http://192.168.1.5:3000/conteo/6818f146de10047544d641cd`);
        const votesData = await votesRes.json();
    
        // Unir opciones con conteo
        const opcionesConVotos = opcionesData.map((opcion) => ({
          descripcion: opcion.descripcion,
          votos: votesData[opcion._id] || 0, // usa el _id directo como clave
        }));
    
        setPoll(pollData);
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
      <DetailBody poll={poll} votes={votes} user={{ nombre: poll.usuarioCreador || "Desconocido" }} />
    </View>
  );
}