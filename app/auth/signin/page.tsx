"use client";
import { useEffect } from "react";
import { LoginForm } from "@/components/LoginForm";
import { motion } from "framer-motion";

const SignIn = () => {
  useEffect(() => {
    // Disable body scrolling when the component mounts
    document.body.style.overflow = "hidden";

    // Re-enable body scrolling when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="relative flex justify-center items-center h-screen overflow-hidden bg-zinc-200">
      <LoginForm />
    </div>
  );
};

export default SignIn;
