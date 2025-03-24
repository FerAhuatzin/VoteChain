import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  VoteIcon, 
  HeartIcon,
  PencilIcon,
} from "./icons";
import { colors } from "../styles/colors";
const categories = [
  {
    name: "Votadas",
    icon: VoteIcon,
  },
  {
    name: "Favoritas",
    icon: HeartIcon,
  },
  {
    name: "Creadas",
    icon: PencilIcon,
  },
];

//Let know the index.js that the category was changed
interface props {
  onCategoryChanged: (category: string) => void;
}

export const MyVotesHeader = ({ onCategoryChanged }: props) => {
  const [selectedCategory, setSelectedCategory] = useState("Votadas");

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    onCategoryChanged(category);
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white", paddingTop: 20 }}>
        <Text style={styles.header_title}>Mis votaciones</Text>
        

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
          gap: 20,
          paddingHorizontal: 20,
        }}
      >
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleCategoryChange(category.name)}
            style={[
              styles.categoryItem,
              selectedCategory === category.name && styles.selectedCategory,
            ]}
          >
            <category.icon size={20} />
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.name && styles.selectedText,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    header_title: {
        width: "90%",
        height: 60,
        fontSize: 25,
        alignSelf: "center",
      },
  searchBar: {
    alignSelf: "center",
    alignItems: "center",
    width: "90%",
    height: 60,
    paddingVertical: 20,
    borderColor: "#c2c2c2",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 50,
    paddingLeft: 20,
  },
  categoryItem: {
    alignItems: "center",
    padding: 10,
    opacity: 0.5,
  },
  selectedCategory: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
    opacity: 1,
  },
  categoryText: {
    marginTop: 5,
  },
  selectedText: {
    color: colors.primary,
  },
});
