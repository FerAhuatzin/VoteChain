import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { FeedItem } from "./feed-element";

interface props {
    data: any[];
}
export const Feed = ({data}: props) => {

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View
        style={{
          width: "85%",
          alignContent: "center",
          alignSelf: "center",
          marginTop: 20,
        }}
      >
        <FlatList
          data={data}
          renderItem={({ item }) => <FeedItem poll={item}/>}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
