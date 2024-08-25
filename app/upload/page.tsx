import React from "react";
import Upload from "@/components/Upload";
import { getServerSession } from "next-auth/next";
import options from "../api/auth/[...nextauth]/options";

const page = async () => {
  const session = await getServerSession(options);
  return <Upload session={session} />;
};

export default page;
