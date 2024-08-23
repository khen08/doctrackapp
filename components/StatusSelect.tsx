"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Status } from "@prisma/client";

const statuses: { label: string; value: Status }[] = [
  { label: "Approved", value: "APPROVED" },
  { label: "Pending", value: "PENDING" },
  { label: "Revision", value: "REVISION" },
];

interface StatusSelectProps {
  id: number;
  status: Status;
}

const StatusSelect: React.FC<StatusSelectProps> = ({ id, status }) => {
  const [selectedStatus, setSelectedStatus] = useState<Status>(status);
  const router = useRouter();

  useEffect(() => {
    const fetchCurrentStatus = async () => {
      try {
        const response = await fetch(`/api/status/${id}`);
        if (response.ok) {
          const data = await response.json();
          setSelectedStatus(data.status);
        } else {
          console.error("Failed to fetch the current status");
        }
      } catch (error) {
        console.error(
          "An error occurred while fetching the current status:",
          error
        );
      }
    };

    fetchCurrentStatus();
  }, [id]);

  const handleStatusChange = async (newStatus: Status) => {
    const previousStatus = selectedStatus;
    setSelectedStatus(newStatus);

    try {
      const response = await fetch(`/api/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      router.refresh();
    } catch (error) {
      console.error("An error occurred while updating status:", error);
      setSelectedStatus(previousStatus);
    }
  };

  return (
    <Select value={selectedStatus} onValueChange={handleStatusChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select status..." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {statuses.map((statusOption) => (
            <SelectItem key={statusOption.value} value={statusOption.value}>
              {statusOption.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default StatusSelect;
