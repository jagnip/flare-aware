import { IngredientCategory } from "@prisma/client";

export const collections = [
  {
    id: "00000000-0000-0000-0000-000000000001",
    name: "Breakfast",
    slug: "breakfast",
  },
  {
    id: "00000000-0000-0000-0000-000000000002",
    name: "Dinner",
    slug: "dinner",
  },
];

export const ingredients = [
  {
    name: "Apples",
    slug: "apple",
    category: IngredientCategory.FRUITS,
    iconFile: "fruits/apple.svg",
    nutrition: {
      per100g: {
        calories: 52,
        protein: 0.3,
        fat: 0.2,
        carbs: 14,
      },
      density: 0.61,
    },
  },
  {
    name: "Bananas",
    slug: "banana",
    category: IngredientCategory.FRUITS,
    iconFile: "fruits/banana.svg",
    nutrition: {
      per100g: {
        calories: 89,
        protein: 1.1,
        fat: 0.3,
        carbs: 23,
      },
      density: 0.94,
    },
  },
  {
    name: "Strawberries",
    slug: "strawberry",
    category: IngredientCategory.FRUITS,
    iconFile: "fruits/strawberry.svg",
    nutrition: {
      per100g: {
        calories: 32,
        protein: 0.7,
        fat: 0.3,
        carbs: 7.7,
      },
      density: 0.59,
    },
  },
  {
    name: "Milk",
    slug: "milk",
    category: IngredientCategory.DAIRY_PRODUCTS,
    iconFile: "dairy-products/milk.svg",
    nutrition: {
      per100g: {
        calories: 42,
        protein: 3.4,
        fat: 1,
        carbs: 5,
      },
      density: 1.03,
    },
  },
  {
    name: "Cheese",
    slug: "cheese",
    category: IngredientCategory.DAIRY_PRODUCTS,
    iconFile: "dairy-products/cheese.svg",
    nutrition: {
      per100g: {
        calories: 402,
        protein: 25,
        fat: 33,
        carbs: 1.3,
      },
      density: 1.1,
    },
  },
  {
    name: "Yogurt",
    slug: "yogurt",
    category: IngredientCategory.DAIRY_PRODUCTS,
    iconFile: "dairy-products/yogurt.svg",
    nutrition: {
      per100g: {
        calories: 59,
        protein: 10,
        fat: 0.4,
        carbs: 3.6,
      },
      density: 1.03,
    },
  },
];
