import React, { useState, useEffect } from 'react';
import { TextInput, Text, View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import CreatePollLayout from '../../components/createPollLayout';
import { usePoll } from '../../components/pollContext';

export default function titleAndDescription() {
  const router = useRouter();
  const { state, dispatch } = usePoll();

  const [title, setTitle] = useState(state.title || '');
  const [description, setDescription] = useState(state.description || '');

  useEffect(() => {
    dispatch({ type: 'SET_TITLE', payload: title });
  }, [title, dispatch]);

  useEffect(() => {
    dispatch({ type: 'SET_DESCRIPTION', payload: description });
  }, [description, dispatch]);

  const isNextEnabled = title.trim().length >= 3;

  return (
    <CreatePollLayout
      title="Ponle un título y descripción a tu votación."
      progress={2/7}
      onBack={() => router.back()}
      onNext={() => router.push('/(create-poll)/addParticipants')}
      isNextEnabled={isNextEnabled}
    >
      <View style={styles.formContainer}>
        {/* Title */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Título</Text>
          <TextInput
            style={styles.input}
            multiline
            value={title}
            onChangeText={setTitle}
            placeholder="Ej. ¿Quién ganará el partido?"
          />
        </View>

        {/* Description */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Descripción</Text>
          <TextInput
            style={styles.input}
            multiline
            value={description}
            onChangeText={setDescription}
            placeholder="Agrega más contexto si lo deseas..."
          />
        </View>
      </View>
    </CreatePollLayout>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    gap: 2, 
  },
  fieldGroup: {
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 6,
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    textAlignVertical: 'top', 
    backgroundColor: '#fff',
  },
});
