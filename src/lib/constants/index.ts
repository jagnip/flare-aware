export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Brocololo"
export const APP_DESCRIPTION = process.env.NEXT_PUBLIC_APP_NAME || "Your cute but bossy meal planner"
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"

export const ROUTES = {
    HOME: '/',
    RECIPES: '/recipes',
    RECIPE_DETAIL: (slug: string) => `/recipes/${slug}`,
    NEW_RECIPE: '/recipes/new',
    EDIT_RECIPE: (slug: string) => `/recipes/${slug}/edit`,
    COLLECTIONS: '/collections',
    COLLECTION_DETAIL: (slug: string) => `/collections/${slug}`,
  };

  export const RECIPE_DEFAULT_VALUES = {
    name: '',
    slug: '',
    images: [],
    handsOnTime: 0,
    handsOffTime: 0,
    instructions: [],
    notes: '',
    ingredients: [],
    collections: []
  };