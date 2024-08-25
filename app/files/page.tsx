import FloatingDockComponent from "@/components/FloatingDock";
import TableHolder from "@/components/TableHolder";
import { Status, File } from "@prisma/client";
import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import options from "../api/auth/[...nextauth]/options";

const fetchData = async (query: Record<string, string | undefined>) => {
  const status = (query.status as Status) || Status.PENDING;
  const page = parseInt(query.page || "1", 10);
  const orderBy = (query.orderBy as keyof File) || "dateUploaded";
  const order = (query.order as "asc" | "desc") || "desc";

  return { status, page, orderBy, order };
};

const Files = async ({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) => {
  const { status, page, orderBy, order } = await fetchData(searchParams);

  const session = await getServerSession(options);
  console.log("Session data:", session);

  return (
    <div>
      <TableHolder
        searchParams={{ status, page: page.toString(), orderBy, order }}
      />
      <FloatingDockComponent session={session} />
    </div>
  );
};

export const generateMetadata = async (context: any): Promise<Metadata> => {
  const searchParams = context?.searchParams || {};
  const { status, page } = await fetchData(searchParams);

  return {
    title: `Files - Page ${page}`,
    description: `Viewing files with status ${status}`,
  };
};

export default Files;
