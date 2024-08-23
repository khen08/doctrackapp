import {
  IconFileUpload,
  IconBell,
  IconLogout,
  IconFileInfo,
} from "@tabler/icons-react";

export type LinkItem = {
  title: string;
  icon: JSX.Element;
  href?: string;
  onClick?: () => void;
};

export const LINKS: LinkItem[] = [
  {
    title: "Upload Files",
    icon: (
      <IconFileUpload className="h-8 w-8 text-neutral-500 dark:text-neutral-300" />
    ),
    href: "/upload",
  },
  {
    title: "Notifications",
    icon: (
      <IconBell className="h-8 w-8 text-neutral-500 dark:text-neutral-300" />
    ),
    onClick: () => alert("No new notifications!"),
  },
  {
    title: "Sign Out",
    icon: (
      <IconLogout className="h-8 w-8 text-neutral-500 dark:text-neutral-300" />
    ),
    href: "/auth/signout",
  },
];

export const getUpdatedLinks = (currentPath: string): LinkItem[] => {
  return LINKS.map((link) => {
    if (currentPath === "/upload" && link.title === "Upload Files") {
      return {
        ...link,
        title: "Files",
        icon: (
          <IconFileInfo className="h-8 w-8 text-neutral-500 dark:text-neutral-300" />
        ),
        href: "/",
      };
    }
    return link;
  });
};
