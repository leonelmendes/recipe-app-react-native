import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { search4AllMeals } from '@/app/services/recipeApi'
import { Meal } from '@/app/models/Meals'
import RecipeCard from '@/components/RecipeCard'

const ProfileScreen = () => {
  const router = useRouter()
  const [recipes, setRecipes] = useState<Meal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const data = await search4AllMeals(4) // Busca 4 receitas
        setRecipes(data)
      } catch (error) {
        console.error('Error loading recipes:', error)
      } finally {
        setLoading(false)
      }
    }
    loadRecipes()
  }, [])

  const handleEditProfile = () => {
    router.push('../editProfile')
  }

  const handleRecipePress = (idMeal: string) => {
    router.push({ pathname: '../recipeDetail', params: { recipe: idMeal } })
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Text style={styles.header}>My profile</Text>

        {/* Profile Info */}
        <View style={styles.profileSection}>
          <Image
            style={styles.avatar}
            source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
          />
          <TouchableOpacity 
            style={styles.editButton}
            onPress={handleEditProfile}
          >
            <Text style={styles.editText}>Edit profile</Text>
          </TouchableOpacity>
          <Text style={styles.name}>Alessandra Blair</Text>
          <Text style={styles.bio}>
            Hello world! I'm Alessandra Blair. I'm from Italy 🇮🇹 I love cooking so much!
          </Text>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{recipes.length}</Text>
              <Text style={styles.statLabel}>Recipes</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>13</Text>
              <Text style={styles.statLabel}>Videos</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>14K</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>120</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>
        </View>

        {/* Recipes Section */}
        <Text style={styles.sectionTitle}>My Recipes</Text>
        
        {loading ? (
          <ActivityIndicator size="large" color="#E74C3C" style={styles.loader} />
        ) : (
          <View style={styles.recipesGrid}>
            {recipes.map((recipe, index) => (
              <View key={recipe.idMeal} style={[
                styles.recipeColumn,
                index % 2 === 0 ? styles.leftColumn : styles.rightColumn
              ]}>
                <TouchableOpacity onPress={() => handleRecipePress(recipe.idMeal)}>
                  <RecipeCard
                    image={{ uri: recipe.strMealThumb }}
                    title={recipe.strMeal}
                    rating={4.5}
                    ingredients={15}
                    time="30 min"
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
    marginBottom: 10,
  },
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  editButton: {
    borderWidth: 1,
    borderColor: '#E74C3C',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 15,
  },
  editText: {
    color: '#E74C3C',
    fontWeight: '600',
    fontSize: 14,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bio: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 40,
    marginBottom: 20,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  recipesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    marginBottom: 80,
  },
  recipeColumn: {
    width: '50%',
    padding: 10,
  },
  leftColumn: {
    paddingRight: 5,
  },
  rightColumn: {
    paddingLeft: 5,
  },
  recipeCard: {
    width: '100%',
  },
  loader: {
    marginVertical: 40,
  },
})

export default ProfileScreen