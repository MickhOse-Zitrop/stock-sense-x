import { Page } from "@/components/shared";
import { getUserSession } from "@/lib/get-user-session";
import { prisma } from "@/prisma/prisma";
import React from "react";

export default async function Home({ params }: { params: { id: string } }) {
  const { id } = await params;

  const session = await getUserSession();

  if (!session) {
    return <Page.UploadData />;
  }

  const user =
    (await prisma.user.findFirst({
      where: {
        id: Number(session.id),
      },
    })) || undefined;

  return <Page.UploadData user={user} />;
}