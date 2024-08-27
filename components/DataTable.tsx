"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
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
import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";
import { SearchParams } from "./TableHolder";
import FileStatusBadge from "@/components/FileStatusBadge";
import StatusSelect from "@/components/StatusSelect";
import mime from "mime";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";

type FileWithUser = File & { User: User | null };

interface Props {
  files: FileWithUser[];
  searchParams: SearchParams;
  currentUser: User | null;
}

const DataTable: React.FC<Props> = ({ files, searchParams, currentUser }) => {
  const [selectedFile, setSelectedFile] = useState<{
    fileUrl: string;
    fileName: string;
  } | null>(null);

  const [fileToDelete, setFileToDelete] = useState<FileWithUser | null>(null);

  const router = useRouter();

  const deleteFile = async (fileId: number) => {
    try {
      const response = await fetch(`/api/files/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileId }),
      });

      if (response.ok) {
        router.refresh();
      } else {
        const data = await response.json();
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("An error occurred while deleting the file.");
    }
  };

  const userFiles =
    currentUser && currentUser.role !== "ADMIN"
      ? files.filter((file) => file.userId === currentUser.id)
      : files;

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

  const encodeUserName = (name: string) => encodeURIComponent(name);

  return (
    <div className="w-full">
      <div className="rounded-md sm:border">
        <Table>
          <TableHeader>
            <TableRow>
              {/* Table Headers */}
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
              <TableHead>
                <div className="flex justify-center">Actions</div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userFiles.map((file) => {
              const userName = file.User
                ? encodeUserName(file.User.name)
                : "unknown";
              const fileUrl = `/uploads/${userName}/${file.fileName}`;

              return (
                <TableRow key={file.id}>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <span
                          className="cursor-pointer text-primary hover:underline"
                          onClick={() =>
                            setSelectedFile({
                              fileUrl,
                              fileName: file.fileName,
                            })
                          }
                        >
                          {file.fileName}
                        </span>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Download File</DialogTitle>
                          <DialogDescription>
                            Click the button below to download the file.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          {selectedFile && (
                            <a
                              href={selectedFile.fileUrl}
                              download={selectedFile.fileName}
                              className="cursor-pointer"
                            >
                              <Button>Download</Button>
                            </a>
                          )}
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      {file.fileSize} MB
                    </div>
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
                  <TableCell>
                    <div className="flex justify-center">
                      <Dialog>
                        <DialogTrigger asChild>
                          <button
                            className="text-red-600 hover:text-red-800"
                            onClick={() => setFileToDelete(file)}
                          >
                            <Trash2 size={20} />
                          </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Delete File</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete this file? This
                              action cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button
                              variant="destructive"
                              onClick={() => {
                                if (fileToDelete) deleteFile(fileToDelete.id);
                              }}
                            >
                              Delete
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DataTable;
