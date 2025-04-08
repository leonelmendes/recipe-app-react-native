import { StyleSheet, Text, View, Image, TouchableOpacity, ImageSourcePropType } from 'react-native'
import React from 'react'

interface RecipeCardProps {
  image: ImageSourcePropType;
  title: string;
  rating?: number;
  ingredients?: number;
  time?: string;
}

export default function RecipeCard({
  image,
  title,
  rating = 4.5,
  ingredients = 4,
  time = '30 min',
}: RecipeCardProps) {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
        <Text style={styles.details}>{ingredients} ingredients · {time}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>⭐ {rating}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: 160,
    marginRight: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 120,
  },
  info: {
    padding: 12,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  details: {
    color: '#888',
    fontSize: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  rating: {
    fontSize: 12,
    color: '#E67E22',
  },
})