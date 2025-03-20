import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList
} from 'react-native';

// 1) Import your icons here:
import {
  SearchIcon,
  PopularIcon,
  SportsIcon,
  PoliticsIcon,
  CinemaIcon,
  TechnologyIcon,
  EconomyIcon,
  MusicIcon,
  NatureIcon,
} from "../../components/icons.jsx";

export default function CategoryScreen() {
  const categoryData = [
    { id: 'cine', label: 'Cine', icon: CinemaIcon },
    { id: 'deportes', label: 'Deportes', icon: SportsIcon },
    { id: 'economia', label: 'Economía', icon: EconomyIcon },
    { id: 'tecnologia', label: 'Tecnología', icon: TechnologyIcon },
    { id: 'politica', label: 'Política', icon: PoliticsIcon },
    { id: 'ambiente', label: 'Ambiente', icon: NatureIcon },
    { id: 'educacion', label: 'Educación', icon: SearchIcon },
    { id: 'musica', label: 'Música', icon: MusicIcon },
  ];

  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleSelectCategory = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      if (selectedCategories.length < 3) {
        setSelectedCategories([...selectedCategories, categoryId]);
      }
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
          color = {isSelected ? "#fff" : "#333"}
          size = {40}
          //style={{ width: 30, height: 30 }}
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          ¿Cuál de estas categorías describiría mejor tu votación?
        </Text>
        <Text style={styles.subtitle}>
          Selecciona hasta 3 categorías
        </Text>
      </View>

      <FlatList
        data={categoryData}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={styles.gridContent}
      />

      <View style={styles.footer}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.footerButtonText}>Atrás</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton}>
          <Text style={styles.footerButtonText}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  
  header: {
    marginTop: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
  },
  gridContent: {
    paddingBottom: 2,
  },
  categoryItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    marginVertical: 2,
    marginHorizontal: 4,
    paddingVertical: 10,
    borderRadius: 10,
  },
  categoryItemSelected: {
    backgroundColor: '#000', 
  },
  iconContainer: {
    marginBottom: 2,
  },

  categoryLabel: {
    fontSize: 14,
    color: '#333',
  },
  categoryLabelSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto', 
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#e5e5e5',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  nextButton: {
    backgroundColor: '#007aff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  footerButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
