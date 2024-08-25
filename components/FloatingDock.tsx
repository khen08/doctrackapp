"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FloatingDock } from "@/components/ui/floating-dock";
import { LINKS, LinkItem } from "@/constants/navigationLinks";
import { IconFileInfo, IconUserPlus } from "@tabler/icons-react";

interface FloatingDockComponentProps {
  session: any;
}

const FloatingDockComponent: React.FC<FloatingDockComponentProps> = ({
  session,
}) => {
  const pathname = usePathname();
  const [updatedLinks, setUpdatedLinks] = useState<LinkItem[]>(LINKS);

  useEffect(() => {
    const newLinks: LinkItem[] = [];

    if (session?.user?.role === "ADMIN") {
      newLinks.push({
        title: "Add User",
        icon: (
          <IconUserPlus className="h-8 w-8 text-neutral-500 dark:text-neutral-300" />
        ),
        href: "/users",
      });
    }

    if (pathname === "/upload") {
      newLinks.push({
        title: "My Files",
        icon: (
          <IconFileInfo className="h-8 w-8 text-neutral-500 dark:text-neutral-300" />
        ),
        href: "/files",
      });
    } else {
      const uploadLink = LINKS.find((link) => link.href === "/upload");
      if (uploadLink) {
        newLinks.push(uploadLink);
      }
    }

    const notificationsLink = LINKS.find(
      (link) => link.title === "Notifications"
    );
    if (notificationsLink) {
      newLinks.push(notificationsLink);
    }

    const signOutLink = LINKS.find((link) => link.title === "Sign Out");
    if (signOutLink) {
      newLinks.push(signOutLink);
    }

    setUpdatedLinks(newLinks);
  }, [pathname, session]);

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
