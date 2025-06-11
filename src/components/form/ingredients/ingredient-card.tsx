"use client";

import { IngredientDB } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const IngredientCard = ({ ingredient } : { ingredient: IngredientDB}) => {
  return (
    <Card className="mb-2">
      <CardHeader>
        <div className="flex items-center gap-2">
          <img
            src="/images/logo.png"
            alt="Ingredient"
            className="h-6 w-6 rounded-sm"
          />
          <CardTitle className="flex justify-between items-center w-full ">
            {ingredient.ingredient?.name ?? "Unknown ingredient"}
            <div>
              {ingredient.amount} {ingredient.unit}{" "}
            </div>
          </CardTitle>
        </div>
      </CardHeader>
      {ingredient.extraInfo && (
        <CardContent className="text-sm text-muted-foreground">
          {ingredient.extraInfo}
        </CardContent>
      )}
    </Card>
  );
};

export default IngredientCard;
