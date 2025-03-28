import { Recipe } from "@/types/recipe";

export const recipes: Recipe[] = [
  {
    id: "1",
    title: "Spaghetti Bolognese",
    slug: "spaghetti-bolognese",
    ingredients: [
      { name: "Spaghetti", amount: "200g" },
      { name: "Ground beef", amount: "300g" },
      { name: "Tomato sauce", amount: "1 cup" },
      { name: "Onion", amount: "1, diced" },
    ],
    servings: 2,
    handsOnTime: 15,
    handsOffTime: 30,
    nutritionalValue: {
      kcal: 550,
      carbs: 60,
      fat: 25,
      protein: 30,
    },
    instructions: [
      "Boil spaghetti according to package instructions.",
      "Cook beef and onion until browned.",
      "Add tomato sauce and simmer for 20 minutes.",
      "Serve sauce over spaghetti.",
    ],
    source: {
      name: "My Italian Kitchen",
      url: "https://example.com/spaghetti-bolognese",
    },
    notes: "Can be frozen for up to 2 months.",
    photos: ["/images/recipe.jpg"],
  },
  {
    id: "2",
    title: "Avocado Toast",
    slug: "avocado-toast",
    ingredients: [
      { name: "Bread slice", amount: "2" },
      { name: "Avocado", amount: "1" },
      { name: "Lemon juice", amount: "1 tsp" },
      { name: "Salt", amount: "to taste" },
    ],
    servings: 1,
    handsOnTime: 5,
    handsOffTime: 0,
    nutritionalValue: {
      kcal: 320,
      carbs: 28,
      fat: 20,
      protein: 6,
    },
    instructions: [
      "Toast the bread slices.",
      "Mash avocado with lemon juice and salt.",
      "Spread on toast and serve.",
    ],
    source: {
      name: "Quick Bites",
      url: "https://example.com/avocado-toast",
    },
    photos: ["/images/recipe.jpg"],
  },
  {
    id: "3",
    title: "Overnight Oats",
    slug: "overnight-oats",
    ingredients: [
      { name: "Rolled oats", amount: "1/2 cup" },
      { name: "Milk", amount: "1/2 cup" },
      { name: "Chia seeds", amount: "1 tbsp" },
      { name: "Honey", amount: "1 tsp" },
    ],
    servings: 1,
    handsOnTime: 5,
    handsOffTime: 480, // 8 hours
    nutritionalValue: {
      kcal: 290,
      carbs: 35,
      fat: 8,
      protein: 10,
    },
    instructions: [
      "Mix all ingredients in a jar.",
      "Refrigerate overnight.",
      "Stir and add toppings before serving.",
    ],
    notes: "You can add fruit or nut butter in the morning.",
    photos: ["/images/recipe.jpg"],
  },

  {
    id: "5",
    title: "Grilled Cheese Sandwich",
    slug: "grilled-cheese-sandwich",
    ingredients: [
      { name: "Bread slices", amount: "2" },
      { name: "Cheddar cheese", amount: "2 slices" },
      { name: "Butter", amount: "1 tbsp" },
    ],
    servings: 1,
    handsOnTime: 5,
    instructions: [
      "Butter one side of each bread slice.",
      "Place cheese between the unbuttered sides.",
      "Grill in a pan until golden on both sides.",
    ],
  },
];
