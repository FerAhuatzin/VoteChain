import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Alert, Image, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { usePoll } from '../../components/pollContext';
import CreatePollLayout from '../../components/createPollLayout';
import { CameraIcon, GalleryIcon } from '../../components/icons';


export default function AddImage() {
  const router = useRouter();
  const { state, dispatch } = usePoll();
  const [selectedImage, setSelectedImage] = useState(state.image || null);
  const [loading, setLoading] = useState(false);

  const handleImagePicked = async (result) => {
    if (!result.canceled) {
      const asset = result.assets[0];
      setSelectedImage(asset.uri);
  
      // Aquí SOLO guardamos el URI en el contexto
      dispatch({
        type: 'SET_IMAGE',
        payload: asset.uri
      });
    }
  };
  

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permiso requerido', 'Necesitas permitir el uso de la cámara.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    await handleImagePicked(result);
  };

  const openGallery = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permiso requerido', 'Necesitas permitir acceso a tu galería.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    await handleImagePicked(result);
  };

  const isNextEnabled = selectedImage !== null && !loading;

  return (
    <CreatePollLayout
      title="Agrega una imagen que describa tu votación."
      progress={4 / 7}
      onBack={() => router.back()}
      onNext={() => router.push('/(create-poll)/endDate')}
      isNextEnabled={isNextEnabled}
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={openCamera}>
          <CameraIcon size={30} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={openGallery}>
          <GalleryIcon size={30} color="white" />
        </TouchableOpacity>

        {loading && <ActivityIndicator size="large" color="#000" style={{ marginTop: 16 }} />}

        {selectedImage && !loading && (
          <Image source={{ uri: selectedImage }} style={styles.preview} />
        )}
      </View>
    </CreatePollLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    gap: 16,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 20,
    alignItems: 'center',
    width: 160,
  },
  preview: {
    marginTop: 16,
    width: 300,
    height: 200,
    borderRadius: 10,
  },
});
