import React from "react";
import prisma from "@/prisma/db";
import DataTable from "./DataTable";
import Pagination from "@/components/Pagination";
import StatusFilter from "@/components/StatusFilter";
import { Status, File } from "@prisma/client";
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

  const fileCount = await prisma.file.count({ where });
  const files = await prisma.file.findMany({
    where,
    orderBy: {
      [orderBy]: order,
    },
    take: pageSize,
    skip: (page - 1) * pageSize,
    include: { User: true },
  });

  const session = await getServerSession(options);
  const currentUser = session?.user;

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
        itemCount={fileCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </div>
  );
};

export default TableHolder;
