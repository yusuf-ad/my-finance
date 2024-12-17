"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";
import { Loader2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    setIsLoading(true);

    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/login"); // redirect to login page
          },
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      disabled={isLoading}
      onClick={handleLogout}
      size={"lg"}
      className="font-bold"
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin" />
          Logging out
        </>
      ) : (
        <>
          <LogOut />
          Logout
        </>
      )}
    </Button>
  );
}

export default LogoutButton;
