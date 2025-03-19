"use client";
import * as React from "react";
import { useRouter } from "next/navigation";

import { Button } from "@heroui/button";

interface BlueBtn {
  href?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
}

export const PrimaryBtn: React.FC<BlueBtn> = ({
  href = "/",
  size = "lg",
  className = "",
  children,
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (href) {
      router.push(href);
    }
  };
  return (
    <Button
      onPress={handleClick}
      size={size}
      className={`mt-8 bg-accent text-white font-jet uppercase rounded-md px-12 py-6 hover:!opacity-100 hover:scale-95 smooth ${className}`}
    >
      {children}
    </Button>
  );
};
