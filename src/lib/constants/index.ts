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


export const FOODS = [
  "banana", "grapes", "blueberries", "raspberries", "strawberries", "pineapple", "pomegranate", "apple", "orange", "lemon", "lime", "peach", "pear", "plum", "apricot", "kiwi",
  "avocado", "tomato", "pepper", "carrot", "beetroot", "parsnip", "asparagus", "broccoli", "romanesco", "cauliflower", "courgette", "cucumber", "radish", "celery", "rhubarb",
  "lettuce", "spinach", "chard", "cabbage", "kale", "bok choy", "rocket", "chicory", "fennel", "spring onion", "leek", "onion", "shallot", "garlic", "ginger",
  "pumpkin", "butternut squash", "acorn squash", "spaghetti squash", "sweet potato", "potato", "yam", "plantain", "peas", "green beans", "edamame", "broad beans",
  "mushroom", "chanterelle", "portobello", "shiitake", "porcini", "white mushroom", "brown mushroom", "truffle", "almond", "cashew", "walnut", "pecan", "hazelnut", "brazil nut", "macadamia", "pine nut", "chestnut", "peanut",
  "sunflower seed", "pumpkin seed", "sesame seed", "chia seed", "flaxseed", "poppy seed", "coriander seed", "fennel seed", "mustard seed", "cumin seed", "caraway seed",
  "basil", "parsley", "coriander", "dill", "chives", "mint", "oregano", "thyme", "rosemary", "sage", "tarragon", "bay leaf", "marjoram", "lovage", "savoury",
  "chili", "red chili", "green chili", "paprika", "cayenne", "black pepper", "white pepper", "nutmeg", "mace", "clove", "cinnamon", "star anise", "allspice", "cardamom", "vanilla", "saffron", "turmeric",
  "salt", "sea salt", "rock salt", "soy sauce", "fish sauce", "worcestershire sauce", "vinegar", "balsamic vinegar", "red wine vinegar", "apple cider vinegar", "rice vinegar", "white vinegar",
  "beef", "pork", "chicken", "duck", "goose", "turkey", "lamb", "rabbit", "venison", "bacon", "ham", "sausage", "mince", "meatball", "steak", "liver", "offal",
  "egg", "egg yolk", "egg white", "quail egg", "duck egg",
  "salmon", "tuna", "sardine", "mackerel", "anchovy", "herring", "trout", "cod", "hake", "halibut", "sole", "octopus", "squid", "prawn", "shrimp", "lobster", "crab", "scallop", "clam", "mussel", "oyster",
  "milk", "cream", "butter", "yogurt", "cheese", "goat cheese", "blue cheese", "mozzarella", "ricotta", "feta", "parmesan", "cheddar",
  "bread", "baguette", "sourdough", "brioche", "pita", "naan", "tortilla", "bun", "roll",
  "flour", "semolina", "cornmeal", "breadcrumbs", "pasta", "spaghetti", "penne", "macaroni", "noodle", "rice", "risotto", "couscous", "bulgur", "quinoa", "barley", "oats", "polenta",
  "sugar", "brown sugar", "icing sugar", "honey", "syrup", "molasses", "maple syrup", "jam", "chocolate", "cocoa", "vanilla extract", "almond extract",
  "oil", "olive oil", "sunflower oil", "rapeseed oil", "sesame oil", "coconut oil", "butter", "ghee", "shortening", "lard"
]
