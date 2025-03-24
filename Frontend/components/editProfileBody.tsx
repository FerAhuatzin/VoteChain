import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { colors } from "../styles/colors";
interface Props {
  user: any;
}

export const EditBody = ({ user }: Props) => {
  const [name, setName] = useState(user?.nombre || "");
  const [password, setPassword] = useState(user?.contraseña || "");
  const [email, setEmail] = useState(user?.email || "");
  const [profilePhoto, setProfilePhoto] = useState(user?.imagen || null);
  const router = useRouter();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePhoto(result.assets[0].uri);
    }
  };

  return (
    <View
      style={styles.container}
    >
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          <Image source={{uri: profilePhoto}} style={styles.image} />
          <Text style={styles.label}>Cambiar foto de perfil</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Nombre"
        />

        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Contraseña"
          secureTextEntry
        />

        <Text style={styles.label}>Correo</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Correo"
          keyboardType="email-address"
        />

          <TouchableOpacity style={styles.button} onPress={() => router.back()}>
            <Text style={{ color: "white", fontSize: 16,}}>Guardar cambios</Text>
          </TouchableOpacity>
      
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
  label: {
    marginVertical: 10,
    fontSize: 16,
  },
  input: {
    alignSelf: "center",
    alignItems: "center",
    width: "100%",
    height: 55,
    paddingVertical: 20,
    borderColor: "#c2c2c2",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 15,
    paddingLeft: 20,
  },
  imagePicker: {
    alignSelf: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
  },
  button: {
    width: "100%",
    height: 55,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    position: "absolute",
    bottom: 20,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
