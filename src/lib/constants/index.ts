export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Brocololo";
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_NAME || "Your cute but bossy meal planner";
export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

export const ROUTES = {
  HOME: "/",
  RECIPES: "/recipes",
  RECIPE_DETAIL: (slug: string) => `/recipes/${slug}`,
  NEW_RECIPE: "/recipes/new",
  EDIT_RECIPE: (slug: string) => `/recipes/${slug}/edit`,
  COLLECTIONS: "/collections",
  COLLECTION_DETAIL: (slug: string) => `/collections/${slug}`,
};

export const API_ROUTES = {
  INGREDIENT_SEARCH: "/api/ingredients/search",
  INGREDIENTS: "/api/ingredients",
  COLLECTIONS: "/api/collections",
  // add others as needed
};

//amounts with "a" have to be first for regex to work correctly
export const QUALITATIVE_INGREDIENT_AMOUNTS = [
  "a pinch",
  "pinch",
  "a dash",
  "dash",
  "a handful",
  "handful",
  "a few",
  "few",
  "a little",
  "little",
  "some",
  "a splash",
  "splash",
  "a sprinkle",
  "sprinkle",
  "a glug",
  "glug",
  "a drizzle",
  "drizzle",
  "a squeeze",
  "squeeze",
  "a blob",
  "blob",
  "a slosh",
  "slosh",
  "a smidgen",
  "smidgen",
  "a smidge",
  "smidge",
  "a smidgeon",
  "smidgeon",
  "a scoop",
  "scoop",
  "a bunch",
  "bunch",
];

export const INGREDIENT_UNITS = [
  "tsp",
  "tbsp",
  "teaspoon",
  "tablespoon",
  "teaspoons",
  "tablespoons",
  "g",
  "kg",
  "ml",
  "l",
  "pc",
  "pcs",
  "cup",
  "cups",
  "clove",
  "cloves",
  "slice",
  "slices",
  "rasher",
  "rashers",
  "handful",
  "handfuls",
  "dash",
  "dashes",
  "pinch",
  "pinches",
  "can",
  "cans",
  "stick",
  "sticks",
  "pack",
  "packs",
];

export const INGREDIENT_UNITS_SELECT = [
  "tsp",
  "tbsp",
  "g",
  "kg",
  "ml",
  "l",
  "pc",
  "cup",
  "clove",
  "slice",
  "rasher",
  "handful",
  "dash",
  "pinch",
  "can",
  "stick",
  "pack",
];

export const UNCOUNTABLE_UNITS = new Set(["g", "kg", "ml", "l", "tsp", "tbsp"]);

export const INGREDIENT_CATEGORIES = {
  FRUITS: "Fruits",
  VEGETABLES: "Vegetables",
  GRAIN: "Grain",
  DAIRY_PRODUCTS: "Dairy Products",
  MEAT_PRODUCTS: "Meat Products",
  FISH_AND_SEAFOOD: "Fish and Seafood",
  PASTA: "Pasta",
  LEGUMES: "Legumes",
  BAKERY_PRODUCTS: "Bakery Products",
  BAKING_AND_SWEETS: "Baking and Sweets",
  BEVERAGES_AND_LIQUIDS: "Beverages and Liquids",
  CONDIMENTS_AND_SAUCES: "Condiments and Sauces",
  HERBS_AND_SPICES: "Herbs and Spices",
  SEEDS_AND_NUTS: "Seeds and Nuts",
  PRESERVED_AND_PICKLED: "Preserved and Pickled",
};

