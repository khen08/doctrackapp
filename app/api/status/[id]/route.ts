import { NextResponse } from "next/server";
import prisma from "@/prisma/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  if (id) {
    try {
      const file = await prisma.file.findUnique({
        where: { id: Number(id) },
        select: { status: true },
      });

      if (!file) {
        return NextResponse.json(
          { message: "File not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({ status: file.status });
    } catch (error) {
      console.error("Error fetching file status:", error);
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ message: "Invalid id" }, { status: 400 });
  }
}
