import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  FlatList
} from 'react-native';
import { useRouter } from 'expo-router';
import CreatePollLayout from '../../components/createPollLayout';
import { CloseIcon, CreateIcon } from '../../components/icons';
import { usePoll } from '../../components/pollContext';
export default function AddParticipants() {
  const router = useRouter();
  const { state, dispatch } = usePoll();
  const [options, setOptions] = useState(
    state.participants && state.participants.length > 0
      ? state.participants.map((p, i) => ({ id: i + 1, text: p }))
      : [{ id: 1, text: '' }, { id: 2, text: '' }]
  );
  const nextId = useRef(3);
  
  useEffect(() => {
    const participants = options.map(opt => opt.text.trim()).filter(Boolean);
    dispatch({ type: 'SET_PARTICIPANTS', payload: participants });
  }, [options, dispatch]);

  const translateAnim = useRef(new Animated.Value(0)).current;

  const handleAddOption = () => {
    Animated.timing(translateAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      translateAnim.setValue(0);
    });

    setOptions([...options, { id: nextId.current++, text: '' }]);
  };

  const handleRemoveOption = (id) => {
    setOptions(options.filter(opt => opt.id !== id));
  };

  const handleChangeOption = (id, newText) => {
    setOptions(options.map(opt =>
      opt.id === id ? { ...opt, text: newText } : opt
    ));
  };

  const isNextEnabled = options.length >= 2 && 
    options.filter(opt => opt.text.trim().length > 0).length >= 2;

  return (
    <CreatePollLayout
      title="Agrega los participantes de tu votación"
      progress={3/7}
      onBack={() => router.back()}
      onNext={() => router.push('/(create-poll)/addImage')}
      isNextEnabled={isNextEnabled}
    >
      <View style={styles.optionsContainer}>
        {options.map((opt, index) => (
            <View key={opt.id} style={styles.optionRow}>
                <TextInput
                    style={styles.input}
                    placeholder={`Opción ${index + 1}`}
                    value={opt.text}
                    onChangeText={(text) => handleChangeOption(opt.id, text)}
                />
                {options.length > 2 && (
                    <TouchableOpacity onPress={() => handleRemoveOption(opt.id)}>
                        <CloseIcon size={20} color="gray" />
                    </TouchableOpacity>
                )}
            </View>
        ))}

        <Animated.View
          style={{
            transform: [
              {
                translateY: translateAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 20],
                }),
              },
            ],
          }}
        >
          <TouchableOpacity style={styles.addButton} onPress={handleAddOption}>
            <View style={styles.addButtonContent}>
              <CreateIcon size={20} color="white" />
              <Text style={styles.addButtonText}>Agregar opción</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </CreatePollLayout>
  );
}

const styles = StyleSheet.create({
  optionsContainer: {
    gap: 12,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  input: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  addButton: {
    marginTop: 8,
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
    fontSize: 16,
  },
  addButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
