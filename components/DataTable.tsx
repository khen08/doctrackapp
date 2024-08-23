import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { File, User } from "@prisma/client";
import Link from "next/link";
import { ArrowDown, ArrowUp } from "lucide-react";
import { SearchParams } from "./TableHolder";
import FileStatusBadge from "@/components/FileStatusBadge";
import StatusSelect from "@/components/StatusSelect";

type FileWithUser = File & { User: User | null };

interface Props {
  files: FileWithUser[];
  searchParams: SearchParams;
  currentUser: User | null;
}

const DataTable = async ({ files, searchParams, currentUser }: Props) => {
  const getNextOrder = (field: keyof File) => {
    if (searchParams.orderBy === field && searchParams.order === "asc") {
      return "desc";
    }
    return "asc";
  };

  const renderSortIcon = (field: keyof File) => {
    if (searchParams.orderBy === field) {
      return searchParams.order === "asc" ? (
        <ArrowUp className="inline p-1" />
      ) : (
        <ArrowDown className="inline p-1" />
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      <div className="rounded-md sm:border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Link
                  href={{
                    query: {
                      ...searchParams,
                      orderBy: "fileName",
                      order: getNextOrder("fileName"),
                    },
                  }}
                >
                  File Name
                </Link>
                {renderSortIcon("fileName")}
              </TableHead>
              <TableHead>
                <div className="flex justify-center">
                  <Link
                    href={{
                      query: {
                        ...searchParams,
                        orderBy: "fileSize",
                        order: getNextOrder("fileSize"),
                      },
                    }}
                  >
                    File Size (MB)
                  </Link>
                  {renderSortIcon("fileSize")}
                </div>
              </TableHead>
              <TableHead>
                <div className="flex justify-center">
                  <Link
                    href={{
                      query: {
                        ...searchParams,
                        orderBy: "dateUploaded",
                        order: getNextOrder("dateUploaded"),
                      },
                    }}
                  >
                    Date Uploaded
                  </Link>
                  {renderSortIcon("dateUploaded")}
                </div>
              </TableHead>
              <TableHead>
                <div className="flex justify-center">
                  <Link
                    href={{
                      query: {
                        ...searchParams,
                        orderBy: "dateReceived",
                        order: getNextOrder("dateReceived"),
                      },
                    }}
                  >
                    Date Received
                  </Link>
                  {renderSortIcon("dateReceived")}
                </div>
              </TableHead>
              <TableHead>
                <div className="flex justify-center">
                  <Link
                    href={{
                      query: {
                        ...searchParams,
                        orderBy: "status",
                        order: getNextOrder("status"),
                      },
                    }}
                  >
                    Status
                  </Link>
                  {renderSortIcon("status")}
                </div>
              </TableHead>
              <TableHead>
                <div className="flex justify-center">
                  <Link
                    href={{
                      query: {
                        ...searchParams,
                        orderBy: "userId",
                        order: getNextOrder("userId"),
                      },
                    }}
                  >
                    Uploaded By
                  </Link>
                  {renderSortIcon("userId")}
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.map((file) => (
              <TableRow key={file.id}>
                <TableCell>
                  <Link href="#">{file.fileName}</Link>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center">{file.fileSize} MB</div>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    {file.dateUploaded.toLocaleDateString("en-US", {
                      year: "2-digit",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    {file.dateReceived.toLocaleDateString("en-US", {
                      year: "2-digit",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    {currentUser && currentUser.role === "ADMIN" ? (
                      <StatusSelect id={file.id} status={file.status} />
                    ) : (
                      <FileStatusBadge status={file.status} />
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    {file.User ? file.User.name : "Unknown"}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DataTable;
