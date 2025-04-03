export const recipes = [
  {
    name: "Spaghetti Bolognese",
    slug: "spaghetti-bolognese",
    category: "Main Course",
    images: ["/images/recipe.jpg"], // ✅ Updated to use uniform image path
    ingredients: JSON.stringify([
      { name: "Spaghetti", amount: "200g" },
      { name: "Ground beef", amount: "300g" },
      { name: "Tomato sauce", amount: "1 cup" },
      { name: "Onion", amount: "1, diced" },
    ]),
    servings: 2,
    handsOnTime: 15,
    handsOffTime: 30,
    nutritionalValue: JSON.stringify({
      kcal: 550,
      carbs: 60,
      fat: 25,
      protein: 30,
    }),
    instructions: [
      "Boil spaghetti according to package instructions.",
      "Cook beef and onion until browned.",
      "Add tomato sauce and simmer for 20 minutes.",
      "Serve sauce over spaghetti.",
    ],
    source: JSON.stringify({
      name: "My Italian Kitchen",
      url: "https://example.com/spaghetti-bolognese",
    }),
    notes: "Can be frozen for up to 2 months.",
  },
  {
    name: "Chicken Curry",
    slug: "chicken-curry",
    category: "Main Course",
    images: ["/images/recipe.jpg"], // ✅ Uniform path
    ingredients: JSON.stringify([
      { name: "Chicken breast", amount: "400g" },
      { name: "Coconut milk", amount: "1 can" },
      { name: "Curry powder", amount: "2 tbsp" },
      { name: "Onion", amount: "1, diced" },
    ]),
    servings: 4,
    handsOnTime: 20,
    handsOffTime: 40,
    nutritionalValue: JSON.stringify({
      kcal: 700,
      carbs: 50,
      fat: 40,
      protein: 60,
    }),
    instructions: [
      "Cook onions until soft.",
      "Add chicken and brown.",
      "Add coconut milk and curry powder, simmer for 30 minutes.",
      "Serve with rice.",
    ],
    source: JSON.stringify({
      name: "Asian Delights",
      url: "https://example.com/chicken-curry",
    }),
    notes: "Can be served with naan bread.",
  },
  {
    name: "Caesar Salad",
    slug: "caesar-salad",
    category: "Salad",
    images: ["/images/recipe.jpg"], // ✅ Uniform path
    ingredients: JSON.stringify([
      { name: "Romaine lettuce", amount: "1 head" },
      { name: "Parmesan cheese", amount: "50g" },
      { name: "Croutons", amount: "1 cup" },
      { name: "Caesar dressing", amount: "1/2 cup" },
    ]),
    servings: 2,
    handsOnTime: 10,
    handsOffTime: 0,
    nutritionalValue: JSON.stringify({
      kcal: 300,
      carbs: 20,
      fat: 18,
      protein: 12,
    }),
    instructions: [
      "Chop lettuce and place in a bowl.",
      "Add parmesan, croutons, and dressing.",
      "Toss and serve.",
    ],
    source: JSON.stringify({
      name: "Healthy Kitchen",
      url: "https://example.com/caesar-salad",
    }),
    notes: "Add grilled chicken for extra protein.",
  },
  {
    name: "Beef Tacos Tacoticco",
    slug: "beef-tacos",
    category: "Main Course",
    images: ["/images/recipe.jpg"], // ✅ Uniform path
    ingredients: JSON.stringify([
      { name: "Ground beef", amount: "500g" },
      { name: "Taco shells", amount: "8" },
      { name: "Cheese", amount: "100g" },
      { name: "Lettuce", amount: "1/2 head, shredded" },
      { name: "Sour cream", amount: "1/2 cup" },
    ]),
    servings: 4,
    handsOnTime: 15,
    handsOffTime: 10,
    nutritionalValue: JSON.stringify({
      kcal: 850,
      carbs: 60,
      fat: 45,
      protein: 40,
    }),
    instructions: [
      "Brown ground beef in a pan.",
      "Fill taco shells with beef, cheese, lettuce, and sour cream.",
      "Serve immediately.",
    ],
    source: JSON.stringify({
      name: "Mexican Fiesta",
      url: "https://example.com/beef-tacos",
    }),
    notes: "Top with salsa for extra flavor.",
  },
  {
    name: "Pancakes",
    slug: "pancakes",
    category: "Breakfast",
    images: ["/images/recipe.jpg"], // ✅ Uniform path
    ingredients: JSON.stringify([
      { name: "Flour", amount: "1 cup" },
      { name: "Milk", amount: "1 cup" },
      { name: "Egg", amount: "1" },
      { name: "Butter", amount: "2 tbsp, melted" },
      { name: "Sugar", amount: "1 tbsp" },
    ]),
    servings: 4,
    handsOnTime: 10,
    handsOffTime: 5,
    nutritionalValue: JSON.stringify({
      kcal: 350,
      carbs: 55,
      fat: 12,
      protein: 8,
    }),
    instructions: [
      "Mix all ingredients until smooth.",
      "Heat a pan and pour batter to form pancakes.",
      "Cook until golden on both sides.",
      "Serve with syrup or fruit.",
    ],
    source: JSON.stringify({
      name: "Breakfast Basics",
      url: "https://example.com/pancakes",
    }),
    notes: "Perfect for a weekend brunch.",
  }
];