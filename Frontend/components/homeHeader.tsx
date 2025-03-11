import React, { useState } from "react";
import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  SearchIcon,
  PopularIcon,
  SportsIcon,
  PoliticsIcon,
  CinemaIcon,
  TechnologyIcon,
  EconomyIcon,
} from "./icons";
import {colors} from "../styles/colors";
import { opacity } from "react-native-reanimated/lib/typescript/Colors";
const categories = [
  {
    name: "Populares",
    icon: PopularIcon,
  },
  {
    name: "Deportes",
    icon: SportsIcon,
  },
  {
    name: "Política",
    icon: PoliticsIcon,
  },
  {
    name: "Cine",
    icon: CinemaIcon,
  },
  {
    name: "Tecnología",
    icon: TechnologyIcon,
  },
  {
    name: "Economía",
    icon: EconomyIcon,
  },
];

//Let know the index.js that the category was changed
interface props {
  onCategoryChanged: (category: string) => void
}

export const HomeHeader = ({onCategoryChanged}: props) => {
  const [selectedCategory, setSelectedCategory] = useState("Populares"); 
  const [searchText, setSearchText] = useState("");

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    onCategoryChanged(category);
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white"}}>
      <View style={{ alignItems: "center", paddingVertical: 10 }}>
        <View style={styles.searchBar}>
          <SearchIcon size={20} style={{position: "absolute", left: 15, opacity: 0.5}} />
          <TextInput style={{position: "absolute", left: 40}} placeholder="Encuentra votaciones interesantes" value={searchText} onChangeText={setSearchText} />
        </View>
      </View>

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ alignItems: "center", gap: 20, paddingHorizontal: 20 }}
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
            <category.icon size={24}/>
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
  searchBar: {
    flexDirection: "row",
    borderColor: "#c2c2c2",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 50,
    width: "85%",
    height: 60,
    alignItems: "center",
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
