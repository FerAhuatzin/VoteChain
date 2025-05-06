import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList
} from 'react-native';
import { usePoll } from '../../components/pollContext';


import CreatePollLayout from '../../components/createPollLayout';
import {
  SearchIcon,
  SportsIcon,
  PoliticsIcon,
  CinemaIcon,
  TechnologyIcon,
  EconomyIcon,
  MusicIcon,
  NatureIcon,
} from '../../components/icons';

export default function Category() {
  const router = useRouter();
  const { state, dispatch } = usePoll(); 

  const categoryData = [
    { id: 'cine', label: 'Cine', icon: CinemaIcon },
    { id: 'deportes', label: 'Deportes', icon: SportsIcon },
    { id: 'economia', label: 'Economia', icon: EconomyIcon },
    { id: 'tecnologia', label: 'Tecnologia', icon: TechnologyIcon },
    { id: 'politica', label: 'Politica', icon: PoliticsIcon },
    { id: 'ambiente', label: 'Ambiente', icon: NatureIcon },
    { id: 'educacion', label: 'Educacion', icon: SearchIcon },
    { id: 'musica', label: 'Musica', icon: MusicIcon },
  ];

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    dispatch({ type: 'SET_CATEGORIES', payload: selectedCategories });
  }, [selectedCategories, dispatch]);

  const handleSelectCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else if (selectedCategories.length < 3) {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const renderCategory = ({ item }) => {
    const isSelected = selectedCategories.includes(item.id);
    const IconComponent = item.icon;

    return (
      
      <TouchableOpacity
        onPress={() => handleSelectCategory(item.id)}
        style={[
          styles.categoryItem,
          isSelected && styles.categoryItemSelected
        ]}
      >
        <View style={styles.iconContainer}>
          <IconComponent
            color={isSelected ? '#fff' : '#333'}
            size={40}
            fill={isSelected ? '#fff' : '#333'}
          />
        </View>
        <Text
          style={[
            styles.categoryLabel,
            isSelected && styles.categoryLabelSelected
          ]}
        >
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  const isNextEnabled = selectedCategories.length > 0;

  return (
    <CreatePollLayout
      title="¿Cuál de estas categorías describiría mejor tu votación?"
      progress={1/7}
      onBack={() => router.replace('/(tabs)/index')}
      onNext={() => router.push('/(create-poll)/titleAndDescription')}
      hideBackButton = {true}
      isNextEnabled={isNextEnabled}
    >
      <Text>Selecciona hasta 3 categorías</Text>


      <FlatList
        data={categoryData}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={styles.gridContent}
      />
    </CreatePollLayout>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  gridContent: {
    paddingBottom: 10,
  },
  categoryItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    marginVertical: 4,
    marginHorizontal: 4,
    paddingVertical: 10,
    borderRadius: 20,
  },
  categoryItemSelected: {
    backgroundColor: '#000',
  },
  iconContainer: {
    marginBottom: 4,
  },
  categoryLabel: {
    fontSize: 16,
    color: '#333',
  },
  categoryLabelSelected: {
    color: '#fff',
    fontWeight: '600',
  },
});
