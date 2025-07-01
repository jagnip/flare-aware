import { IngredientDB } from "@/types";
import { API_ROUTES } from "../constants";
import { IngredientFormInput } from "../validator";

export async function fetchIngredients() : Promise<IngredientDB[]>{
    const r = await fetch(API_ROUTES.INGREDIENTS);
    if (!r.ok) throw new Error('Failed to load');
    return r.json();
}

export async function createIngredient(
  payload: IngredientFormInput
): Promise<IngredientDB> {
  const res = await fetch(API_ROUTES.INGREDIENTS, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error("Failed to create ingredient")
  return res.json()
}

export async function updateIngredient(
  id: number,
  payload: IngredientFormInput
): Promise<IngredientDB> {
  const res = await fetch(`${API_ROUTES.INGREDIENTS}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update ingredient");
  return res.json();
}

export async function deleteIngredient(id: number): Promise<void> {
  const res = await fetch(`${API_ROUTES.INGREDIENTS}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete ingredient");
}