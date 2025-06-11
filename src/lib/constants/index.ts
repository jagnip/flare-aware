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

//amounts with "a" have to be first for regex to work correctly
export const QUALITATIVE_INGREDIENT_AMOUNTS = [
  "a pinch", "pinch",
  "a dash", "dash",
  "a handful", "handful",
  "a few", "few",
  "a little", "little",
  "some",
  "a splash", "splash",
  "a sprinkle", "sprinkle",
  "a glug", "glug",
  "a drizzle", "drizzle",
  "a squeeze", "squeeze",
  "a blob", "blob",
  "a slosh", "slosh",
  "a smidgen", "smidgen",
  "a smidge", "smidge",
  "a smidgeon", "smidgeon",
  "a scoop", "scoop",
  "a bunch", "bunch"
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


