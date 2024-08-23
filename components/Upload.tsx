"use client";

import React from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { FloatingDock } from "@/components/ui/floating-dock";
import { LINKS } from "@/constants/navigationLinks";

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
        <FileUpload />
      </div>
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-4">
        <FloatingDock
          mobileClassName="translate-y-20"
          items={LINKS}
          desktopClassName="space-x-4 p-4"
        />
      </div>
    </div>
  );
};

export default Dashboard;
