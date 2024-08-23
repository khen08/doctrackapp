"use client";

import { LoginForm } from "@/components/LoginForm";
import React from "react";

const page = () => {
  return (
    <div className="grainy-light">
      <div className="relative flex justify-center items-center h-screen overflow-hidden bg-zinc-50">
        <LoginForm />
      </div>
    </div>
  );
};

export default page;
