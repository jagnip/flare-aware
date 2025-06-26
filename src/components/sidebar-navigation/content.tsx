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
import { create } from "domain";
import { createCollection } from "@/lib/actions/collection.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import CollectionForm from "./collection-form";

const AppSidebarContent = ({
  collections,
}: {
  collections: CollectionDB[];
}) => {
  const [isCollectionAdding, setIsCollectionAdding] = useState(false);
  const [collectionList, setCollectionList] = useState<CollectionDB[]>(collections);

  const form = useForm<CollectionFormInput>({
    resolver: zodResolver(collectionSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
    },
  });

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Collections</SidebarGroupLabel>
        <SidebarGroupAction
          onClick={() => setIsCollectionAdding(!isCollectionAdding)}
        >
          <Plus /> <span className="sr-only">Add collection</span>
        </SidebarGroupAction>
        <SidebarGroupContent>
          {isCollectionAdding && (
            <CollectionForm setIsCollectionAdding={setIsCollectionAdding} setCollectionList={setCollectionList} />
          )}
          <SidebarMenu>
            {collectionList.map((collection) => (
              <SidebarMenuItem key={collection.slug}>
                <SidebarMenuButton asChild>
                  <Link
                    href={ROUTES.COLLECTION_DETAIL(collection.slug)}
                    className="flex items-center gap-2 py-1.5"
                  >
                    {collection.name}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};

export default AppSidebarContent;
