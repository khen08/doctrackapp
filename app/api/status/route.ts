import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/db";
import { z } from "zod";

const statusUpdateSchema = z.object({
  fileId: z.number(),
  status: z.enum(["APPROVED", "PENDING", "REVISION"]),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PATCH") {
    const result = statusUpdateSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json(result.error.errors);
    }

    const { fileId, status } = result.data;

    const file = await prisma.file.update({
      where: { id: fileId },
      data: { status },
    });

    return res.status(200).json(file);
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
};

export default handler;
