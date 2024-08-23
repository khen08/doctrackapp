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
  status: Status; // Initial status passed as a prop
}

const StatusSelect: React.FC<StatusSelectProps> = ({ id, status }) => {
  const [selectedStatus, setSelectedStatus] = useState<Status>(status);
  const router = useRouter();

  // Fetch the latest status from the database when the component mounts
  useEffect(() => {
    const fetchCurrentStatus = async () => {
      try {
        const response = await fetch(`/api/status/${id}`); // Adjusted path
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
    setSelectedStatus(newStatus); // Optimistic update

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

      router.refresh(); // Optionally refresh the page
    } catch (error) {
      console.error("An error occurred while updating status:", error);
      setSelectedStatus(previousStatus); // Revert to previous status on error
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
