import { NextResponse } from "next/server";
import prisma from "@/prisma/db";
import { getServerSession } from "next-auth/next";
import options from "@/app/api/auth/[...nextauth]/options";
import path from "path";
import fs from "fs";

export async function POST(req: Request) {
  try {
    const session = await getServerSession({ req, ...options });

    if (!session || !session.user || !session.user.id) {
      console.log("Unauthorized access attempt");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const files = formData.getAll("files") as File[];

    if (files.length === 0) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }

    const userId = session.user.id;
    const userName = session.user.name;
    const userFolder = path.join("public/uploads", String(userName));

    if (!fs.existsSync(userFolder)) {
      fs.mkdirSync(userFolder, { recursive: true });
    }

    const fileEntries = files.map((file: File) => ({
      fileName: file.name,
      fileSize: parseFloat((file.size / (1024 * 1024)).toFixed(3)),
      fileLocation: path.join(userFolder, file.name),
      userId: Number(userId),
    }));

    const savedFiles = await Promise.all(
      files.map(async (file: File) => {
        const filePath = path.join(userFolder, file.name);
        console.log("Saving file to:", filePath);

        fs.writeFileSync(filePath, Buffer.from(await file.arrayBuffer()));

        return {
          ...fileEntries.find((f) => f.fileName === file.name)!,
          fileLocation: filePath,
        };
      })
    );

    if (savedFiles.length === 0) {
      return NextResponse.json(
        { error: "No files were saved" },
        { status: 400 }
      );
    }

    await prisma.file.createMany({ data: savedFiles });
    return NextResponse.json(
      { message: "Files uploaded successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error uploading files:", error);
    return NextResponse.json(
      { error: "Server error", details: (error as Error).message },
      { status: 500 }
    );
  }
}
