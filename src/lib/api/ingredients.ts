import { IngredientDB } from "@/types";
import { API_ROUTES } from "../constants";

export async function fetchIngredients() : Promise<IngredientDB[]>{
    const r = await fetch(API_ROUTES.INGREDIENTS);
    if (!r.ok) throw new Error('Failed to load');
    return r.json();
  }