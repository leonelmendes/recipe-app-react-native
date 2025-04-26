import { ScrollView, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import Animated, {useSharedValue, useAnimatedScrollHandler, useAnimatedStyle, interpolate, Extrapolate,} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { searchMealsByName } from '@/app/services/recipeApi';
import { Meal } from '@/app/models/Meals';
import SearchBar from '@/components/SearchBar';
import Toast from 'react-native-toast-message';

const recipe = () => {
  const router = useRouter();
  const scrollY = useSharedValue(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);

  // Executa uma vez ao montar
  useEffect(() => {
    fetchInitialRecipes();
  }, []);

  // Executa a cada letra digitada
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim() !== '') {
        handleSearch();
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);
  
  const fetchInitialRecipes = async () => {
    setLoading(true);
    try {
      const results = await searchMealsByName(''); // busca todas
      setSearchResults(results || []);
    } catch (error) {
      //console.error('Erro ao carregar receitas iniciais:', error);
      Toast.show({
        type: 'error',
        text1: 'Erro ao carregar receitas',
        text2: 'Houve um erro ao carregar as receitas iniciais. Tente novamente mais tarde.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    try {
      const results = await searchMealsByName(searchQuery);
      setSearchResults(results || []);
    } catch (error) {
      //console.error('Search error:', error);
      Toast.show({
        type: 'error',
        text1: 'Erro ao buscar receitas',
        text2: 'Houve um erro ao buscar as receitas. Tente novamente mais tarde.',
      });
    } finally {
      setLoading(false);
    }
  };

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 50], [0, 1], Extrapolate.CLAMP),
      transform: [
        {
          translateY: interpolate(scrollY.value, [0, 50], [-20, 0], Extrapolate.CLAMP),
        },
      ],
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.animatedHeader, headerStyle]}>
        <Text style={styles.headerText}>Receitas Populares</Text>
      </Animated.View>

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.title}>Search recipes</Text>
        
        {/* Barra de pesquisa */}
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchBar}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#E74C3C" style={styles.loader} />
        ) : searchResults.length > 0 ? (
          <View style={styles.resultsContainer}>
            {searchResults.map((recipe) => (
              <TouchableOpacity
                key={recipe.idMeal}
                style={styles.recipeCard}
                onPress={() => router.push({
                  pathname: '../recipeDetail',
                  params: { recipe: recipe.idMeal }
                })}
              >
                <Image
                  source={{ uri: recipe.strMealThumb }}
                  style={styles.recipeImage}
                />
                <View style={styles.recipeInfo}>
                  <Text style={styles.recipeTitle}>{recipe.strMeal}</Text>
                  <Text style={styles.recipeDetails}>5 ingredients • 20 mins</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <>
            <Text style={styles.sectionTitle}>Recent Search</Text>
            <View style={styles.recentSearchesContainer}>
              {['Pasta', 'Chicken', 'Dessert', 'Salad'].map((search, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.recentSearchItem}
                  onPress={() => {
                    setSearchQuery(search);
                    handleSearch();
                  }}
                >
                  <Text style={styles.recentSearchText}>{search}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
      </Animated.ScrollView>
      <Toast position='bottom' visibilityTime={2000} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  animatedHeader: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'white',
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchBar: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  resultsContainer: {
    gap: 16,
  },
  recipeCard: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    overflow: 'hidden',
  },
  recipeImage: {
    width: 100,
    height: 100,
  },
  recipeInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  recipeTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  recipeDetails: {
    color: '#888',
    fontSize: 14,
  },
  recentSearchesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  recentSearchItem: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  recentSearchText: {
    color: '#333',
  },
  loader: {
    marginVertical: 40,
  },
});

export default recipe;