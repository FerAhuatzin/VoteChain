import { Link } from "expo-router";
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { ClockIcon } from "./icons";

export const FeedItem = ({ poll }) => {
  return (
    <Link href={`/${poll.id}`} asChild>
      <TouchableOpacity >
        <View style={styles.elementWrapper}>
          <Image source={poll.imagen } style={styles.image} />
          <Text style={styles.title}>{poll.titulo}</Text>
          <View style={styles.captions}>
            <ClockIcon size={13} />
            <Text style={{paddingLeft: 5, fontSize: 12,}}>{poll.fechaFin}</Text>
        </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
    elementWrapper: {
        flex: 1,
        height: 200,
        marginBottom: 20,
    },
    image: {
        width: "100%",
        height: 150,
        borderRadius: 20,
    },
    title: {
        marginTop: 5,
        fontSize: 16,
    },
    captions: {
        flexDirection: "row",
        marginTop: 5,
        opacity: 0.5,
        justifyContent: "flex-start",
        alignItems: "center",
    }
});
