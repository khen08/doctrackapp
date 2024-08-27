import { NextResponse } from "next/server";
import prisma from "@/prisma/db";
import { getServerSession } from "next-auth/next";
import options from "@/app/api/auth/[...nextauth]/options";
import path from "path";
import fs from "fs";

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession({ req, ...options });

    if (!session || !session.user || !session.user.id) {
      console.log("Unauthorized access attempt");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { fileId } = await req.json();

    if (!fileId) {
      return NextResponse.json(
        { error: "File ID not provided" },
        { status: 400 }
      );
    }

    const file = await prisma.file.findUnique({
      where: { id: Number(fileId) },
    });

    if (!file || file.userId !== session.user.id) {
      return NextResponse.json(
        { error: "File not found or unauthorized" },
        { status: 404 }
      );
    }

    const filePath = path.join(process.cwd(), file.fileLocation);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await prisma.file.delete({
      where: { id: Number(fileId) },
    });

    return NextResponse.json(
      { message: "File deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting file:", error);
    return NextResponse.json(
      { error: "Server error", details: (error as Error).message },
      { status: 500 }
    );
  }
}
