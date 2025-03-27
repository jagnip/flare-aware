"use client";

import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <Image
        priority={true}
        src="/images/logo.png"
        width={48}
        height={48}
        alt={`${APP_NAME} logo`}
      />
      <div className="p-6 rounded-lg shadow-md w-1/2 text-center">
        <h1 className="text-3xl font-bold mb-4">Not Found</h1>
        <p>Could not find requested resource</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => router.push("/")}
        >
          Back to home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
