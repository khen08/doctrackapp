"use client";
import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { LINKS } from "@/constants/navigationLinks";

const FloatingDockComponent = () => {
  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-4">
      <FloatingDock
        mobileClassName="translate-y-20"
        items={LINKS}
        desktopClassName="space-x-4 p-4"
      />
    </div>
  );
};

export default FloatingDockComponent;
