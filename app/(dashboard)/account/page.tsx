import { AccountForm, Block, PageHeader } from "@/components/shared";
import { getUserSession } from "@/lib/get-user-session";
import { prisma } from "@/prisma/prisma";
import React from "react";

export default async function AccountPage() {
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

  return (
    <>
      <PageHeader title="Настройки аккаунта" />
      <Block className="items-center">
        <AccountForm className="w-md" user={user} />
      </Block>
    </>
  );
}