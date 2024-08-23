"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignOut = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/auth/signin" });
  };

  return (
    <div className="relative flex justify-center items-center h-screen overflow-hidden bg-zinc-200">
      <div className="flex items-center justify-center min-h-screen pt-24">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Sign Out</CardTitle>
            <CardDescription>
              Are you sure you want to sign out of your account?
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-between">
            <Button className="w-full mr-2" onClick={() => router.push("/")}>
              Cancel
            </Button>
            <Button className="w-full" onClick={handleSignOut}>
              Sign Out
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignOut;
