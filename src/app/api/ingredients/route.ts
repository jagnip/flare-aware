

import { prisma } from "@/app/db/prisma";
import { NextResponse } from "next/server";

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