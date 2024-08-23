"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { TextEffect } from "./TextEffect";
import { IconScript } from "@tabler/icons-react";
import ToggleMode from "./ToggleMode";
import Image from "next/image";

export function Navbar() {
  const [currentDateTime, setCurrentDateTime] = useState<Date | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-24 py-4 px-8 bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white shadow-lg flex items-center justify-between z-50">
      <div className="flex items-center w-1/4 lg:w-1/6 xl:w-1/8">
        <Image
          src="/logo.png"
          alt="Company Logo"
          width={96}
          height={96}
          className="w-24 lg:w-28 xl:w-32"
        />
      </div>

      <div className="flex items-center justify-center w-2/4 lg:w-2/3 xl:w-3/4">
        <IconScript
          size={32}
          className="mx-3 hidden lg:inline lg:mx-4 xl:mx-5"
        />
        <TextEffect
          as="h1"
          preset="blur"
          per="char"
          className="sm:text-md md:text-lg lg:text-xl xl:text-2xl font-extrabold tracking-wide"
        >
          Document Tracking System
        </TextEffect>
        <IconScript
          size={32}
          className="mx-3 hidden lg:inline lg:mx-4 xl:mx-5"
        />
      </div>

      <div className="flex flex-row items-center justify-between w-1/4 lg:w-1/6 xl:w-1/8 pr-4">
        <div className="flex flex-col items-end">
          {currentDateTime && (
            <>
              <span className="font-semibold hidden text-sm md:inline lg:text-md">
                {currentDateTime.toLocaleDateString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="text-sm md:inline lg:text-md">
                {currentDateTime.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </span>
            </>
          )}
        </div>
        <div className="p-2">
          <ToggleMode />
        </div>
      </div>
    </div>
  );
}
