import React from "react";
import prisma from "@/prisma/db";
import DataTable from "./DataTable";
import Pagination from "@/components/Pagination";
import StatusFilter from "@/components/StatusFilter";
import { Status, File, User } from "@prisma/client";
import { getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";

export interface SearchParams {
  status: Status;
  page: string;
  orderBy: keyof File;
  order: "asc" | "desc";
}

const TableHolder = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const pageSize = 10;
  const page = parseInt(searchParams.page) || 1;

  const orderBy = searchParams.orderBy ? searchParams.orderBy : "dateUploaded";
  const order = searchParams.order ? searchParams.order : "desc";

  const statuses = Object.values(Status);

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  let where = {};

  if (status) {
    where = {
      status,
    };
  }

  // Fetch all files based on filters and user role
  const session = await getServerSession(options);
  const currentUser = session?.user as User | null;

  const allFiles = await prisma.file.findMany({
    where,
    orderBy: {
      [orderBy]: order,
    },
    include: { User: true },
  });

  // Filter files based on the current user's role
  const userFiles =
    currentUser && currentUser.role !== "ADMIN"
      ? allFiles.filter((file) => file.userId === currentUser.id)
      : allFiles;

  // Total count for pagination
  const filteredFileCount =
    currentUser && currentUser.role !== "ADMIN"
      ? userFiles.length
      : allFiles.length;

  // Fetch files for the current page
  const files = userFiles.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="w-full p-4 md:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-4">
        <StatusFilter />
      </div>
      <DataTable
        files={files}
        searchParams={searchParams}
        currentUser={currentUser}
      />
      <div className="w-full h-px my-6" /> {/* separator */}
      <Pagination
        itemCount={filteredFileCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </div>
  );
};

export default TableHolder;
