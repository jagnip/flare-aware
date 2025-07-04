"use client";
import { Calendar, ShoppingCart, Plus } from "lucide-react";

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { CollectionDB } from "@/types";
import Link from "next/link";
import { ROUTES } from "@/lib/constants";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import TextInputField from "../form/text-input-field";
import { Button } from "@/components/ui/button";
import { CollectionFormInput, collectionSchema } from "@/lib/validator";
import { formatCollectionForDB } from "@/lib/actions/utils";
import { createCollection } from "@/lib/actions/collection.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Collection } from "@prisma/client";

type CollectionFormProps = {
  setIsCollectionAdding: (value: boolean) => void;
  setCollectionList: React.Dispatch<React.SetStateAction<Collection[]>>;
};

const CollectionForm = ({
  setIsCollectionAdding,
  setCollectionList,
}: CollectionFormProps) => {
  const form = useForm<CollectionFormInput>({
    resolver: zodResolver(collectionSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(formInputValues: CollectionFormInput) {
    const zodValidatedCollection = collectionSchema.parse(formInputValues);
    const formattedFormInputValues = formatCollectionForDB(
      zodValidatedCollection
    );
    const newCollection = await createCollection(formattedFormInputValues);
    if (!newCollection) {
      console.error("Failed to create collection");
      return;
    }
    setCollectionList((prev) => [...prev, newCollection]);
    setIsCollectionAdding(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((values) => onSubmit(values))}>
        <TextInputField
          form={form}
          name="name"
          placeholder="Enter collection name"
        />
        <Button>Save</Button>
      </form>
    </Form>
  );
};

export default CollectionForm;
