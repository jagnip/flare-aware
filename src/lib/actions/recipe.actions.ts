'use server';
import { PrismaClient } from '@prisma/client';
import { convertToPlainObject } from '../utils';

// Get the latest products
export async function getRecipes() {
  const prisma = new PrismaClient();

  const data = await prisma.recipe.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return convertToPlainObject(data);
}