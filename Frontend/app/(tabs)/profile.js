import { View } from "react-native";
import { ProfileHeader } from "../../components/profileHeader";
import { ProfileBody } from "../../components/profileBody";
import { Stack } from "expo-router";
import { userExample } from "../../example-data/polls-example";
import React from 'react';

export default function Profile() {
  //Retrieve information from user

  return (
    <View style={{ flex: 1, backgroundColor: "white"}}>
      <Stack.Screen options={{ header: () => <ProfileHeader user={userExample}/> }} />
      <ProfileBody/>
    </View>
  );
}