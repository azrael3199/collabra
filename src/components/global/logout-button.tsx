"use client";
import React from "react";
import { Button } from "../ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

interface LogoutButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "btn-primary"
    | "btn-secondary"
    | null;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({
  children,
  className,
  variant,
}) => {
  const supabase = createClientComponentClient();

  const { toast } = useToast();
  const router = useRouter();

  const logoutUser = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        variant: "destructive",
        description: `Could not logout user: ${error}`,
      });
    }
    router.replace("/login");
  };

  return (
    <Button
      variant={variant ?? "secondary"}
      className={className}
      onClick={logoutUser}
    >
      {children}
    </Button>
  );
};

export default LogoutButton;
