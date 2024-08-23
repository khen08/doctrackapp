import React from "react";
import { Badge } from "./ui/badge";
import { Status } from "@prisma/client";

interface Props {
  status: Status;
}

const statusMap: Record<
  Status,
  { label: string; color: "bg-red-400" | "bg-blue-400" | "bg-green-400" }
> = {
  REVISION: { label: "Revision", color: "bg-red-400" },
  PENDING: { label: "Pending", color: "bg-blue-400" },
  APPROVED: { label: "Approved", color: "bg-green-400" },
};

const FileStatusBadge = ({ status }: Props) => {
  return (
    <Badge
      className={`${statusMap[status].color} text-background hover:${statusMap[status].color}`}
    >
      {statusMap[status].label}
    </Badge>
  );
};

export default FileStatusBadge;
