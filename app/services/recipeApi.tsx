import axios from 'axios';
import { Category, Meal } from '../models/Meals';

const API_BASE = 'https://www.themealdb.com/api/json/v1/1';

export const searchMealsByCategory = async (category: string) => {
  try {
    const response = await fetch(`${API_BASE}/filter.php?c=${category}`);
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.error('Erro ao buscar refeições por categoria:', error);
    return [];
}
};

export const searchMealDetail = async (idMeal: string) => {
  try {
    const response = await axios.get(`${API_BASE}/lookup.php?i=${idMeal}`);
    return response.data.meals?.[0];
  } catch (error) {
    console.error('Erro ao buscar detalhes da receita:', error);
    return null;
  }
};

export const searchAllMeals = async () => {
    try {
      const response = await fetch(`${API_BASE}/search.php?f=a`);
      const data = await response.json();
      return data.meals;
    } catch (error) {
      console.error('Erro ao buscar todas as refeições:', error);
      return [];
    }
  };

  export const listCategories = async (): Promise<Category[]> => {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
      const data = await response.json();
      return data.categories || [];
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  };

  export const searchMealsByName = async (name: string): Promise<Meal[]> => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
      const data = await response.json()
      return data.meals || []
    } catch (error) {
      console.error('Error searching meals:', error)
      return []
    }
  }
  export const search4AllMeals = async (limit: number = 4): Promise<Meal[]> => {
    try {
      // Pesquisa por todas as receitas (usando a letra 'a' como filtro amplo)
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=a')
      const data = await response.json()
      return data.meals?.slice(0, limit) || [] // Retorna no máximo 'limit' receitas
    } catch (error) {
      console.error('Error fetching all meals:', error)
      return []
    }
  }