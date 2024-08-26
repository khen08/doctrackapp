import React from "react";
import Upload from "@/components/Upload";
import { getServerSession } from "next-auth/next";
import options from "../api/auth/[...nextauth]/options";
import AccountChecker from "@/components/AccountChecker";

const page = async () => {
  const session = await getServerSession(options);
  return (
    <div>
      <AccountChecker />
      <Upload session={session} />
    </div>
  );
};

export default page;
