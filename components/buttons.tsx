"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";

interface PrimaryBtnProps {
  href?: string;
  size?: "sm" | "md" | "lg";
  onPress?: () => void;
  className?: string;
  children: React.ReactNode;
}

export const PrimaryBtn: React.FC<PrimaryBtnProps> = ({
  href,
  size = "lg",
  onPress,
  className = "",
  children,
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (href) {
      router.push(href);
    } else if (onPress) {
      onPress();
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

interface SecondaryBtn {
  size?: "sm" | "md" | "lg";
  onPress?: () => void;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
}

export const SecondaryBtn: React.FC<SecondaryBtn> = ({
  onPress,
  size = "lg",
  className = "",
  children,
  disabled = false,
}) => {
  const router = useRouter();

  return (
    <Button
      onPress={onPress}
      size={size}
      className={`bg-foreground-100 border-foreground-200 border-2 font-jet font-medium text-sm rounded-lg px-6 hover:!opacity-100 hover:scale-95 smooth ${className}`}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

interface TertiaryBtn {
  size?: "sm" | "md" | "lg";
  onPress?: () => void;
  className?: string;
  children: React.ReactNode;
}

export const TertiaryBtn: React.FC<TertiaryBtn> = ({
  onPress,
  size = "lg",
  className = "",
  children,
}) => {
  const router = useRouter();

  return (
    <Button
      onPress={onPress}
      size={size}
      className={`bg-white gap-1 font-semibold text-base hover:!opacity-100 hover:scale-95 smooth ${className}`}
    >
      {children}
    </Button>
  );
};
