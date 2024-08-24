import React from "react";
import SignIn from "./auth/signin/page";
import options from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await getServerSession(options);

  if (session) {
    redirect("/upload");
  }

  return <SignIn />;
};

export default Dashboard;

//delete functionality to files
//comments or notes to files
//notifications
//received by?????
