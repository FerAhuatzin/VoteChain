import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { colors } from "../styles/colors";
import { useRouter } from "expo-router";

interface Props {
  options: any[];
  idVotacion: string;
}

export const SendBody = ({ options, idVotacion }: Props) => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSelect = (descripcion: string) => {
    setSelectedOption(descripcion);
  };

  const handleConfirmVote = async () => {
    setLoading(true);
    try {
      const opcionSeleccionada = options.find(
        (op) => op.descripcion === selectedOption
      );

      if (!opcionSeleccionada) {
        Alert.alert("Error", "Opción seleccionada no encontrada");
        return;
      }

      const body = {
        idVotacion,
        idOpcion: opcionSeleccionada._id,
        idUsuario: "67c79925289d45ed6e584a27", // fijo por ahora
        voter: "0xC3dA41434d4B2bcB2B25Ea325b64cEFc7a2cEf24",
        signature:
          "0x2c2a8c1455fab862f3231215a0580c8805b5fb0ddc95f22ca1f8bff720ad094a01d0701cda43889661681683b1cbd32901d0725582d46f58478dbaf6068399391c",
      };

      console.log("Enviando voto:", body);

      const res = await fetch("http://192.168.1.5:3000/registrar-voto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        Alert.alert("Éxito", "Tu voto ha sido registrado correctamente", [
          {
            text: "OK",
            onPress: () => router.dismiss(2),
          },
        ]);
      } else {
        const errorData = await res.json();
        Alert.alert(
          "Error",
          errorData?.message || "Hubo un problema al registrar tu voto"
        );
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      Alert.alert("Error", "No se pudo conectar al servidor");
    } finally {
      setLoading(false);
    }
  };

  const opciones = options || [];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Selecciona tu opción</Text>

        {Array.isArray(opciones) && opciones.length > 0 ? (
          opciones.map((opcion, index) => (
            <TouchableOpacity
              key={opcion._id || index}
              style={[
                styles.optionButton,
                selectedOption === String(opcion.descripcion)
                  ? styles.selectedOption
                  : null,
              ]}
              onPress={() => handleSelect(String(opcion.descripcion))}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedOption === String(opcion.descripcion)
                    ? styles.selectedOptionText
                    : null,
                ]}
              >
                {typeof opcion.descripcion === "string" ||
                typeof opcion.descripcion === "number"
                  ? opcion.descripcion
                  : JSON.stringify(opcion.descripcion)}
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={{ textAlign: "center", marginVertical: 10 }}>
            No hay opciones disponibles.
          </Text>
        )}
      </ScrollView>

      <View style={{ paddingVertical: 20 }}>
        <TouchableOpacity
          style={[
            styles.button,
            !selectedOption || loading ? { opacity: 0.5 } : null,
          ]}
          disabled={!selectedOption || loading}
          onPress={handleConfirmVote}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={{ color: "white", fontSize: 16 }}>
              Confirmar voto
            </Text>
          )}
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
    borderRadius: 20,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: colors.primary,
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  selectedOptionText: {
    color: "white",
  },
  button: {
    width: "100%",
    height: 55,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
});
