export interface Meal {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string;
  strSource: string | null;
  strImageSource: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;
  
  // Ingredientes e medidas (1-20)
  [key: `strIngredient${number}`]: string | null;
  [key: `strMeasure${number}`]: string | null;
  
  // Campos adicionais úteis
  strCreativeCommons?: string | null;
  strCommons?: string | null;
  }

  export interface Category {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
  }
