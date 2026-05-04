import { NextRequest, NextResponse } from "next/server";
import { getUserSession } from "@/lib/get-user-session";
import { prisma } from "@/prisma/prisma";
import { EditProjectData } from "@/services/dto/projects.dto";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const id = Number((await params).id);

    const session = await getUserSession();

    if (!session) {
      return NextResponse.json({ error: "Пользователь не найден" });
    }

    const user = await prisma.user.findFirst({
      where: { id: Number(session.id) },
    });

    if (!user) {
      return NextResponse.json({ error: "Пользователь не найден" });
    }

    const project = await prisma.project.findFirst({
      where: { id: id },
    });

    if (!project) {
      return NextResponse.json({ error: "Проект не найден" });
    }

    const response = await fetch((project.dataUrl as string) || "");

    if (!response.ok) {
      return NextResponse.json({ error: "Данные не найдены" });
    }

    const fileBuffer = await response.arrayBuffer();
    const text = new TextDecoder().decode(fileBuffer);

    return NextResponse.json({ text });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: `${error}` }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const id = Number((await params).id);
    const request = (await req.json()) as {
      data: EditProjectData;
    };
    const { data } = request;

    const session = await getUserSession();

    if (!session) {
      return NextResponse.json({ error: "Пользователь не найден" });
    }

    const user = await prisma.user.findFirst({
      where: { id: Number(session.id) },
    });

    if (!user) {
      return NextResponse.json({ error: "Пользователь не найден" });
    }

    const project = await prisma.project.findFirst({
      where: { id: id },
    });

    if (!project) {
      return NextResponse.json({ error: "Проект не найден" });
    }

    const lastProject = await prisma.project.update({
      where: {
        id: project.id,
      },
      data: {
        name: data.name,
        description: data.description,
      },
    });

    const projects = await prisma.project.findMany({
      where: {
        id: user.id,
      },
    });

    return NextResponse.json({ projects, lastProject });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: `${error}` }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const id = Number((await params).id);

    const session = await getUserSession();

    if (!session) {
      return NextResponse.json({ error: "Пользователь не найден" });
    }

    const user = await prisma.user.findFirst({
      where: { id: Number(session.id) },
    });

    if (!user) {
      return NextResponse.json({ error: "Пользователь не найден" });
    }

    const project = await prisma.project.findFirst({
      where: { id, userId: user.id },
    });

    if (!project) {
      return NextResponse.json({ error: "Проект не найден" });
    }

    // await prisma.user.update({
    //   where: { id: user.id },
    //   data: { lastProjectId: undefined },
    // });

    await prisma.project.delete({
      where: { id },
    });

    const projects = await prisma.project.findMany({
      where: { userId: user.id },
    });

    return NextResponse.json({ projects, lastProject: undefined });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: `${error}` }, { status: 500 });
  }
}