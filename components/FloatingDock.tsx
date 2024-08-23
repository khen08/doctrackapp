"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FloatingDock } from "@/components/ui/floating-dock";
import { LINKS } from "@/constants/navigationLinks";
import { IconFileInfo } from "@tabler/icons-react";

const FloatingDockComponent = () => {
  const pathname = usePathname();
  const [updatedLinks, setUpdatedLinks] = useState(LINKS);

  useEffect(() => {
    console.log("Current Path:", pathname);
    const newLinks = LINKS.map((link) => {
      if (link.href === "/upload" && pathname === "/upload") {
        return {
          ...link,
          title: "Files",
          icon: (
            <IconFileInfo className="h-8 w-8 text-neutral-500 dark:text-neutral-300" />
          ),
          href: "/files",
        };
      }
      return link;
    });
    setUpdatedLinks(newLinks);
  }, [pathname]);

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-4">
      <FloatingDock
        mobileClassName="translate-y-20"
        items={updatedLinks}
        desktopClassName="space-x-4 p-4"
      />
    </div>
  );
};

export default FloatingDockComponent;
