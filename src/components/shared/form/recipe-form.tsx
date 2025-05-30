"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const RecipeForm = () => {
  const form = useForm();

  function onSubmit(data: any) {
    console.log("Submitted data:", data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>{field.name}</FormLabel>
              <FormControl>
                <Input placeholder="Enter recipe name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="handsOnTime"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>{field.name}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter prep time in minutes"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="handsOffTime"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>{field.name}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter cooking time in minutes"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="instructions"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>{field.name}</FormLabel>
              <FormControl>
                <Textarea
                  name="instructions"
                  placeholder="Enter your instructions"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          name="notes"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>{field.name}</FormLabel>
              <FormControl>
                <Textarea
                  name="notes"
                  placeholder="Enter your notes"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button>Save</Button>
      </form>
    </Form>
  );
};

export default RecipeForm;
