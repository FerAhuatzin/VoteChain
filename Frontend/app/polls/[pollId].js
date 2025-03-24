import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { pollsExample, votesExample, userExample} from "../../example-data/polls-example";
import { DetailHeader } from "../../components/detailHeader";
import { DetailBody } from "../../components/detailBody";
import { Stack } from "expo-router";
import React from 'react';

export default function Detail() {
  const { pollId } = useLocalSearchParams();
  //Retrieve information from vote right now using static data
  //In the future, we will use the API to retrieve the information
  const pollIdNumber = parseInt(pollId, 10);
  const poll = pollsExample.find((p) => p.id === pollIdNumber);
  const votes = votesExample.find((v) => v.idVotacion === pollIdNumber);

  if (!poll) {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Text>Votación no encontrada</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Stack.Screen options={{ header: () => <DetailHeader imagen={poll.imagen}/> }} />
      <DetailBody poll={poll} votes={votes} user={userExample} />
    </View>
  );
}