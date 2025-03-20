import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { colors } from "../styles/colors";
import { useRouter } from "expo-router";

interface Props {
  votes: any;
}

export const SendBody = ({ votes }: Props) => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelect = (descripcion: string) => {
    setSelectedOption(descripcion);
  };

  const handleDismiss = () => {
    router.dismiss(2);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Selecciona tu opción</Text>
        {votes.opciones.map((opcion, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedOption === opcion.descripcion && styles.selectedOption,
            ]}
            onPress={() => handleSelect(opcion.descripcion)}
          >
            <Text style={[styles.optionText,
              selectedOption === opcion.descripcion && styles.selectedOptionText,]}>{opcion.descripcion}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={{ paddingVertical: 20 }}>
        <TouchableOpacity
          style={styles.button}
          disabled={!selectedOption}
          onPress={() => handleDismiss()}
        >
          <Text style={{ color: "white", fontSize: 20 }}>
            Confirmar voto
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
    marginTop: 10,
    flex: 1,
  },
  title: {
    fontSize: 25,
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: "#f0f0f0",
    padding: 20,
    borderRadius: 15,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: colors.primary,
  },
  optionText: {
    fontSize: 18,
    color: "#333",
  },
  selectedOptionText: {
    color: "white",
  },
  button: {
    width: "100%",
    height: 60,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    opacity: 1,
  },
});
