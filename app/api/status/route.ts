import { NextResponse } from "next/server";
import prisma from "@/prisma/db";
import { z } from "zod";

const statusUpdateSchema = z.object({
  id: z.number(),
  status: z.enum(["APPROVED", "PENDING", "REVISION"]),
});

export async function PATCH(req: Request) {
  try {
    const result = statusUpdateSchema.safeParse(await req.json());
    if (!result.success) {
      return NextResponse.json(result.error.errors, { status: 400 });
    }

    const { id, status } = result.data;

    const file = await prisma.file.update({
      where: { id: id },
      data: { status },
    });

    return NextResponse.json(file);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update file status" },
      { status: 500 }
    );
  }
}
