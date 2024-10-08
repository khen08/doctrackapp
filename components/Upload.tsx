"use client";

import React from "react";
import { FileUpload } from "@/components/ui/file-upload";
import FloatingDockComponent from "./FloatingDock";

interface UploadProps {
  session: any;
}

const Upload: React.FC<UploadProps> = ({ session }) => {
  return (
    <div className="flex flex-col items-center justify-center mb-32">
      <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
        <FileUpload />
      </div>
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-4">
        <FloatingDockComponent session={session} />
      </div>
    </div>
  );
};

export default Upload;
