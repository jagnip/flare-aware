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

export const recipes = [
  {
    id: "00000000-0000-0000-0000-000000000001",
    name: "Avocado Toast",
    slug: "avocado-toast",
    images: ["/images/recipe.jpg"],
    servings: 1,
    handsOnTime: 5,
    handsOffTime: 0,
    instructions: [
      "Toast the bread.",
      "Mash the avocado with lemon juice, salt, and pepper.",
      "Spread avocado on toast and serve.",
    ],
    notes: "You can add chili flakes for a little kick.",
    ingredients: [
      { name: "bread", quantity: 2, unit: "slice" },
      { name: "avocado", quantity: 1, unit: "piece" },
      { name: "lemon juice", quantity: 1, unit: "tbsp" },
      { name: "salt", quantity: 0.25, unit: "tsp" },
      { name: "pepper", quantity: 0.25, unit: "tsp" },
    ],
    source: "https://example.com/avocado-toast",
    collections: [{ id: "00000000-0000-0000-0000-000000000002" }],
  },
  {
    id: "00000000-0000-0000-0000-000000000002",
    name: "Spaghetti Bolognese",
    slug: "spaghetti-bolognese",
    images: ["/images/recipe.jpg"],
    servings: 4,
    handsOnTime: 20,
    handsOffTime: 40,
    instructions: [
      "Heat oil and sauté onion and garlic.",
      "Add ground beef and cook until browned.",
      "Add tomato sauce and simmer.",
      "Cook spaghetti according to package.",
      "Serve sauce over spaghetti.",
    ],
    notes: "Great with parmesan on top.",
    ingredients: [
      { name: "spaghetti", quantity: 400, unit: "g" },
      { name: "ground beef", quantity: 500, unit: "g" },
      { name: "onion", quantity: 1, unit: "piece" },
      { name: "garlic", quantity: 2, unit: "clove" },
      { name: "tomato sauce", quantity: 500, unit: "ml" },
    ],
    source: "https://example.com/avocado-toast",
    collections: [{ id: "00000000-0000-0000-0000-000000000001" }],
  },
];
