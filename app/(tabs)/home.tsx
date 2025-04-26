import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import SearchBar from '@/components/SearchBar'
import RecipeCard from '@/components/RecipeCard'
import { SafeAreaView } from 'react-native-safe-area-context'
import { listCategories, searchAllMeals, searchMealsByCategory } from '@/app/services/recipeApi'
import { Category, Meal } from '../models/Meals'
import { useRouter } from 'expo-router';
import { getProfile } from '../lib/auth'
import { useUser } from '../context/UserContext'
import Toast from 'react-native-toast-message'

type Props = {}

const Home = (props: Props) => {
  const { user } = useUser();
  const [name, setName] = useState('')
  const router = useRouter();
  const [meals, setMeals] = useState<Meal[]>([])
  const [popularMeals, setPopularMeals] = useState<Meal[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    (async () => {
      const profile = await getProfile();
      if (profile?.name) setName(profile.name);
    })();
  }, []);

  useEffect(() => {
    const loadMeals = async () => {
      try {
        const data = await searchAllMeals();
        setPopularMeals(data);
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Error loading meals.',
        });
        //console.error('Error loading meals:', error);
      } finally {
        setLoading(false);
      }
    };
    loadMeals();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const categoriesFromApi = await listCategories();
      // Adicionamos 'All' como primeira categoria manualmente
      const allCategories = [
        {
          idCategory: '0',
          strCategory: 'All',
          strCategoryThumb: 'https://www.themealdb.com/images/media/meals/1543774956.jpg',
          strCategoryDescription: 'All categories'
        },
        ...categoriesFromApi
      ];
      setCategories(allCategories);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Error fetching categories.',
      });
      //console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleCategoryPress = async (category: Category) => {
      setSelectedCategory(category.strCategory);
      setLoading(true);
      try {
        if (category.strCategory === 'All') {
          const all = await searchAllMeals();
          setMeals(all);
        } else {
          const filtered = await searchMealsByCategory(category.strCategory);
          setMeals(filtered);
        }
      } catch (error) {
        console.error('Erro ao filtrar receitas:', error);
      } finally {
        setLoading(false);
      }
  }

  const trendingRecipes = [
    { id: '1', title: 'Indonesian Chicken Burger', author: 'Jackson Cuif', image: require('../../assets/images/geek-salad.jpg') },
    { id: '2', title: 'Beef Wellington', author: 'Gordon Ramsay', image: require('../../assets/images/geek-salad.jpg') }
  ];

  const popularCreators = [
    { id: '1', name: 'Trojan Smith', image: require('../../assets/images/creator1.png') },
    { id: '2', name: 'Niki Samadona', image: require('../../assets/images/creator1.png') }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header com saudação */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello, {user?.name}</Text>
          <Text style={styles.subtitle}>Find best recipes</Text>
        </View>

        {/* Destaque principal */}
        <View style={styles.featuredContainer}>
          <Text style={styles.sectionTitle}>How to make sushi at home</Text>
          <Image 
            source={{ uri: 'https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg' }} 
            style={styles.featuredImage}
          />
        </View>

        {/* Popular Categories */}
                <Text style={styles.sectionTitle}>Popular category</Text>
                {loading ? (
                  <ActivityIndicator size="small" color="#E74C3C" />
                ) : (
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
                    {categories.map((category) => (
                      <TouchableOpacity 
                        key={category.idCategory}
                        style={[
                          styles.categoryButton,
                          selectedCategory === category.strCategory && styles.activeCategory
                        ]}
                        onPress={() => handleCategoryPress(category)}
                      >
                        <Image 
                          source={{ uri: category.strCategoryThumb }} 
                          style={styles.categoryImage}
                        />
                        <Text style={[
                          styles.categoryText,
                          selectedCategory === category.strCategory && styles.activeCategoryText
                        ]}>
                          {category.strCategory}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
          )}

        {loading ? (
          <ActivityIndicator size="large" color="#E74C3C" style={styles.loader} />
        ) : (
          <FlatList
            data={meals}
            keyExtractor={(item) => item.idMeal}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recipesContainer}
            renderItem={({ item }) => (
              <TouchableOpacity 
                onPress={() => router.push({ 
                pathname: '../recipeDetail', 
                params: { recipe: item.idMeal }})}>
                <RecipeCard image={{ uri: item.strMealThumb }}
                  title={item.strMeal}/>
              </TouchableOpacity>
            )}
          />
        )}

        {/* Lista de receitas */}
        <Text style={styles.sectionTitle}>Popular Recipes</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#E74C3C" style={styles.loader} />
        ) : (
          <FlatList
            data={popularMeals}
            keyExtractor={(item) => item.idMeal}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recipesContainer}
            renderItem={({ item }) => (
              <TouchableOpacity 
                onPress={() => router.push({ 
                pathname: '../recipeDetail', 
                params: { recipe: item.idMeal }})}>
                   <RecipeCard 
                image={{ uri: item.strMealThumb }}
                title={item.strMeal}/>
                </TouchableOpacity>
            )}
          />
        )}

                {/* Popular Creators */}
                <Text style={styles.sectionTitle}>Popular creators</Text>
                <FlatList
                  data={popularCreators}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <View style={styles.creatorCard}>
                      <Image source={item.image} style={styles.creatorImage} />
                      <Text style={styles.creatorName}>{item.name}</Text>
                    </View>
                  )}
                  keyExtractor={item => item.id}
                  contentContainerStyle={styles.creatorsContainer}
                />
      </ScrollView>
      <Toast position='bottom' visibilityTime={2000}/>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  featuredContainer: {
    marginVertical: 20,
  },
  featuredImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 5,
  },
  categoriesScroll: {
    marginBottom: 25,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
  },
  activeCategory: {
    backgroundColor: '#E74C3C',
  },
  categoryText: {
    color: '#666',
  },
  activeCategoryText: {
    color: '#fff',
  },
  recipesContainer: {
    paddingBottom: 20,
  },
  loader: {
    marginVertical: 20,
  },
  trendingContainer: {
    paddingBottom: 25,
  },
  trendingCard: {
    width: 200,
    marginRight: 15,
  },
  trendingImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    marginBottom: 8,
  },
  trendingRecipeTitle: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  trendingAuthor: {
    color: '#666',
    fontSize: 12,
  },
  creatorsContainer: {
    paddingBottom: 30,
    marginBottom: 80,
  },
  creatorCard: {
    alignItems: 'center',
    marginRight: 20,
  },
  creatorImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 8,
  },
  creatorName: {
    fontSize: 12,
  },
})