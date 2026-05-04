import { NextRequest, NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { getUserSession } from "@/lib/get-user-session";
import { prisma } from "@/prisma/prisma";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as HandleUploadBody;
  const session = await getUserSession();

  if (!session) {
    return NextResponse.json({ status: 400 });
  }

  try {
    const user = await prisma.user.findFirst({
      where: { id: Number(session.id) },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        return {
          allowedContentTypes: [
            "text/csv",
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          ],
          allowOverwrite: true,
          addRandomSuffix: true,
          tokenPayload: JSON.stringify({
            userId: user.id,
          }),
        };
      },
      onUploadCompleted: async (blob) => console.log(blob),
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.log(error);
    throw error;
  }
}