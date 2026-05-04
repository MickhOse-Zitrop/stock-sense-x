import { getUserSession } from "@/lib/get-user-session";
import { prisma } from "@/prisma/prisma";
import { AccountDialog } from "@/components/shared";
import React from "react";

export default async function AccountModalPage() {
  const session = await getUserSession();

  if (!session) {
    return null;
  }

  const user = await prisma.user.findFirst({
    where: {
      id: Number(session.id),
    },
  });

  if (!user) {
    return null;
  }

  return <AccountDialog user={user} />;
}