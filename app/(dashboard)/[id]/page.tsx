import { getUserSession } from "@/lib/get-user-session";
import { notFound } from "next/navigation";
import { prisma } from "@/prisma/prisma";
import { Page } from "@/components/shared";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!Number(id)) {
    return <Page.EmptyProject />;
  }

  const session = await getUserSession();

  if (!session) {
    return notFound();
  }

  const user = await prisma.user.findFirst({
    where: {
      id: Number(session.id),
    },
  });

  if (!user) {
    return notFound();
  }

  const activeProject = await prisma.project.findFirst({
    where: {
      id: Number(id),
      userId: user.id,
    },
  });

  if (!activeProject) {
    return <Page.EmptyProject />;
  }

  if (activeProject.id !== user.lastProjectId) {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        lastProjectId: activeProject.id,
      },
    });
  }

  return <Page.Project />;
}