export type Ingredient = {
    name: string;
    amount: string;
  };
  
  export type NutritionalValue = {
    kcal: number;
    carbs: number;
    fat: number;
    protein: number;
  };
  
  export type Source = {
    name: string;
    url: string;
  };
  
  export type Recipe = {
    id: string;
    title: string;
    ingredients?: Ingredient[];
    servings?: number;
    handsOnTime?: number;
    handsOffTime?: number;
    nutritionalValue?: NutritionalValue;
    instructions?: string[];
    source?: Source;
    notes?: string;
    photos?: string[];
  };