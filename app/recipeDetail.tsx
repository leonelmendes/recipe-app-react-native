import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from "expo-router";
import { searchMealDetail } from '@/app/services/recipeApi'
import { Meal } from './models/Meals'
import YoutubePlayer from "react-native-youtube-iframe";
import { Ionicons } from '@expo/vector-icons';

export default function RecipeDetail() {
  const { recipe } = useLocalSearchParams();
  const [meal, setMeal] = useState<Meal | null>(null);
  const [activeTab, setActiveTab] = useState<'procedure' | 'ingredients'>('procedure');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await searchMealDetail(recipe as string);
      setMeal(data);
      setLoading(false);
    };
    fetchDetails();
  }, [recipe]);

  const extractIngredients = (meal: Meal) => {
    const ingredients: { ingredient: string; measure: string }[] = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== '') {
        ingredients.push({
          ingredient: ingredient.trim(),
          measure: measure?.trim() || ''
        });
      }
    }
    return ingredients;
  };

  const getYouTubeVideoId = (url: string) => {
    if (!url) return null;
    
    // Handle different YouTube URL formats
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const formatInstructions = (instructions: string) => {
    if (!instructions) return [];
    
    // Split by new lines and filter empty steps
    return instructions
      .split('\r\n')
      .filter(step => step.trim() !== '')
      .map((step, index) => ({
        number: index + 1,
        text: step.trim()
      }));
  };

  const openYoutubeVideo = () => {
    if (meal?.strYoutube) {
      Linking.openURL(meal.strYoutube);
    }
  };

  if (loading || !meal) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E74C3C" />
      </View>
    );
  }

  const ingredientsList = extractIngredients(meal);
  const videoId = getYouTubeVideoId(meal.strYoutube ?? '');
  const instructions = formatInstructions(meal.strInstructions);
  const tags = meal.strTags ? meal.strTags.split(',') : [];

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={{ padding: 20}}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>
      {/* Video ou Image */}
      {videoId ? (
        <View>
          <YoutubePlayer 
            height={200} 
            play={false} 
            videoId={videoId} 
            webViewStyle={styles.video}
          />
          <TouchableOpacity style={styles.youtubeLink} onPress={openYoutubeVideo}>
            <Ionicons name="logo-youtube" size={24} color="red" />
            <Text style={styles.youtubeLinkText}>Assistir no YouTube</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
      )}

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{meal.strMeal}</Text>
        
        {/*  Informaçoes basicas */}
        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={16} color="#666" />
            <Text style={styles.metaText}>30 mins</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="restaurant-outline" size={16} color="#666" />
            <Text style={styles.metaText}>{meal.strCategory}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="location-outline" size={16} color="#666" />
            <Text style={styles.metaText}>{meal.strArea}</Text>
          </View>
        </View>

        {/* categorias */}
        {tags.length > 0 && (
          <View style={styles.tagsContainer}>
            {tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag.trim()}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Tabbutton */}
        <View style={styles.tabButtons}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'procedure' && styles.activeTab]}
            onPress={() => setActiveTab('procedure')}
          >
            <Text style={activeTab === 'procedure' ? styles.activeText : styles.inactiveText}>Modo de Preparo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'ingredients' && styles.activeTab]}
            onPress={() => setActiveTab('ingredients')}
          >
            <Text style={activeTab === 'ingredients' ? styles.activeText : styles.inactiveText}>
              Ingredientes ({ingredientsList.length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab conteudo */}
        {activeTab === 'procedure' ? (
          <View style={styles.steps}>
            <Text style={styles.sectionTitle}>Instruções</Text>
            {instructions.map((step, index) => (
              <View key={index} style={styles.stepBox}>
                <Text style={styles.stepNumber}>Passo {step.number}</Text>
                <Text style={styles.stepText}>{step.text}</Text>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.steps}>
            <Text style={styles.sectionTitle}>Ingredientes</Text>
            {ingredientsList.map((item, index) => (
              <View key={index} style={styles.ingredientItem}>
                <View style={styles.ingredientBullet} />
                <Text style={styles.ingredientText}>
                  {item.measure ? `${item.measure} ${item.ingredient}` : item.ingredient}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Link da fonte da receita */}
        {meal.strSource && (
          <TouchableOpacity 
            style={styles.sourceLink} 
            onPress={() => Linking.openURL(meal.strSource!)}
          >
            <Ionicons name="link" size={16} color="#19C37D" />
            <Text style={styles.sourceText}>Fonte original da receita</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    backgroundColor: '#fff',
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: { 
    width: '100%', 
    height: 250,
    resizeMode: 'cover',
  },
  video: {
    borderRadius: 0,
  },
  youtubeLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  youtubeLinkText: {
    marginLeft: 8,
    color: 'red',
    fontWeight: 'bold',
  },
  infoContainer: { 
    padding: 20,
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  metaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    color: '#666',
    fontSize: 14,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 12,
    color: '#555',
  },
  tabButtons: { 
    flexDirection: 'row', 
    gap: 10, 
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  tabButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
  },
  activeTab: { 
    backgroundColor: '#19C37D' 
  },
  activeText: { 
    color: '#fff', 
    fontWeight: 'bold' 
  },
  inactiveText: { 
    color: '#666' 
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  steps: { 
    gap: 16,
    marginBottom: 20,
  },
  stepBox: {
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    padding: 16,
  },
  stepNumber: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#19C37D',
  },
  stepText: { 
    color: '#555',
    lineHeight: 22,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    paddingLeft: 8,
  },
  ingredientBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#19C37D',
    marginTop: 8,
    marginRight: 12,
  },
  ingredientText: {
    flex: 1,
    color: '#555',
    lineHeight: 22,
  },
  sourceLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  sourceText: {
    marginLeft: 8,
    color: '#19C37D',
    textDecorationLine: 'underline',
  },
});