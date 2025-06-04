"use client";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";
import { FieldValues, UseFormReturn, Path } from "react-hook-form";
import { toast } from "sonner";
import { FieldPathValue } from "react-hook-form";

//T - 

type ImageUploadProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
};

const ImageUpload = <T extends FieldValues>({
  form,
  name,
}: ImageUploadProps<T>) => {
  const images = form.watch(name) as string[];
  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem className="w-full">
          <FormLabel>Images</FormLabel>
          <FormControl>
            <UploadDropzone
              endpoint="imageUploader"
              appearance={{
                button: {
                  color: "#000",
                },
                container: {
                  display: "flex",
                },
              }}
              onClientUploadComplete={(res: { url: string }[]) => {
                const uploadedUrls = res.map((file) => file.url);

                form.setValue(name, [
                  ...images,
                  ...uploadedUrls,
                ] as FieldPathValue<T, typeof name>);
                //“Give me the type of the field in form T located at path name, e.g. images.”
              }}
              onUploadError={(error: Error) => {
                toast(`${error.message}`);
              }}
            />
          </FormControl>
          <FormMessage />
          <div className="mt-4 flex gap-2 flex-wrap">
            {images.map((image: string) => (
              <Image
                key={image}
                src={image}
                alt="product image"
                className="w-20 h-20 object-cover object-center rounded-sm"
                width={100}
                height={100}
              />
            ))}
          </div>
        </FormItem>
      )}
    />
  );
};

export default ImageUpload;
