'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { deleteRecipe } from '@/lib/actions/recipe.actions';

export default function DeleteRecipeForm({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    startTransition(async () => {
      const res = await deleteRecipe(id);
      if (res.success) {
        router.push('/'); // where you want to go or use router.back()
      } else {
        alert(res.message); 
      }
    });
  };

  return (
    <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
      {isPending ? 'Deleting...' : 'Delete Recipe'}
    </Button>
  );
}