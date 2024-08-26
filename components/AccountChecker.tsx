import React from "react";
import { getServerSession } from "next-auth/next";
import options from "@/app/api/auth/[...nextauth]/options";

const AccountChecker = async () => {
  const session = await getServerSession(options);
  return (
    <div>
      {session?.user && (
        <div className="text-center mb-8">
          <p>
            Currently logged in as:{" "}
            <span className="font-bold text-primary">{session.user.name}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default AccountChecker;
