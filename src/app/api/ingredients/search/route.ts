import { prisma } from "@/app/db/prisma";
import pluralize from "pluralize";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { name } = body;

  const cleaned = name.trim().toLowerCase();
  const singular = pluralize.singular(cleaned);
  const plural = pluralize.plural(cleaned);
  const candidates = [cleaned, singular, plural];

  const ingredient = await prisma.ingredient.findFirst({
    where: { name: { in: candidates } },
  });
  
  return NextResponse.json(ingredient);
}