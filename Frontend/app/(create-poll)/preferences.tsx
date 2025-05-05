import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import CreatePollLayout from '../../components/createPollLayout';
import { usePoll } from '../../components/pollContext';

export default function Preferences() {
  const router = useRouter();
  const { state, dispatch } = usePoll();

  // Initialize from context
  const [isPublic, setIsPublic] = useState(state.preferences.isPublic);
  const [showStatsEarly, setShowStatsEarly] = useState(state.preferences.showStatsBeforeEnd);
  const [showUsername, setShowUsername] = useState(state.preferences.showCreatorName);

  // Update context when any preference changes
  useEffect(() => {
    dispatch({
      type: 'SET_PREFERENCES',
      payload: {
        isPublic: isPublic,
        showStatsBeforeEnd: showStatsEarly,
        showCreatorName: showUsername,
      },
    });
  }, [isPublic, showStatsEarly, showUsername, dispatch]);

  return (
    <CreatePollLayout
      title="Selecciona las preferencias de tu votación."
      progress={6/7}
      onBack={() => router.back()}
      onNext={() => router.push('/(create-poll)/summary')}
    >
      <View style={styles.container}>
        <Text>
          También puede modificarse después de terminar con la creación de la votación.
        </Text>

        {/* Preference 1 */}
        <TouchableOpacity
          style={styles.optionRow}
          onPress={() => setIsPublic(!isPublic)}
        >
          <View style={[styles.circle, isPublic && styles.circleSelected]} />
          <Text style={styles.optionText}>Hacer votación pública.</Text>
        </TouchableOpacity>

        {/* Preference 2 */}
        <TouchableOpacity
          style={styles.optionRow}
          onPress={() => setShowStatsEarly(!showStatsEarly)}
        >
          <View style={[styles.circle, showStatsEarly && styles.circleSelected]} />
          <Text style={styles.optionText}>Permitir estadísticas antes de terminar.</Text>
        </TouchableOpacity>

        {/* Preference 3 */}
        <TouchableOpacity
          style={styles.optionRow}
          onPress={() => setShowUsername(!showUsername)}
        >
          <View style={[styles.circle, showUsername && styles.circleSelected]} />
          <Text style={styles.optionText}>Mostrar nombre de usuario.</Text>
        </TouchableOpacity>
      </View>
    </CreatePollLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    fontSize: 16,
  },

  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#aaa',
  },
  circleSelected: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  optionText: {
    fontSize: 14,
  },
});
