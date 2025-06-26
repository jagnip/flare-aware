

import { prisma } from "@/app/db/prisma";
import { NextResponse } from "next/server";
import { ingredientSchema } from "@/lib/validator";

export async function GET() {
  try {
    const ingredients = await prisma.ingredient.findMany({
      orderBy: { name: "asc" },
    });

    return NextResponse.json(ingredients);
  } catch (error) {
    console.error("Failed to fetch ingredients:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = ingredientSchema.parse(body); 

    const newIngredient = await prisma.ingredient.create({
      data: {
        name: data.name,
        slug: data.name.toLowerCase().replace(/\s+/g, "-"),
        iconFile: data.iconFile,
        category: data.category,
        nutrition: {
          calories: data.calories,
          protein: data.protein,
          fat: data.fat,
          carbs: data.carbs,
          density: data.density,
        },
      },
    });

    return NextResponse.json(newIngredient);
  } catch (error) {
    console.error("❌ Error saving ingredient:", error);
    return new NextResponse(
      JSON.stringify({ error: "Invalid input or save failed" }),
      { status: 400 }
    );
  }
}