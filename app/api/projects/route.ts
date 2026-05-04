import { NextRequest, NextResponse } from "next/server";
import { getUserSession } from "@/lib/get-user-session";
import { prisma } from "@/prisma/prisma";
import { CreateProjectData } from "@/services/dto/projects.dto";

export async function GET() {
  try {
    const session = await getUserSession();

    if (!session) {
      return NextResponse.json(
        {
          message: "Неавторизованный пользователь",
        },
        { status: 401 },
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        id: Number(session.id),
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "Неавторизованный пользователь",
        },
        { status: 401 },
      );
    }

    const lastProject = await prisma.project.findFirst({
      where: {
        id: user.lastProjectId || undefined,
      },
    });

    const projects = await prisma.project.findMany({
      where: {
        userId: user.id,
      },
    });

    if (!lastProject) {
      if (projects.length === 0) {
        return NextResponse.json({ projects: [], lastProject: undefined });
      }

      return NextResponse.json({ projects, lastProject: projects[0] });
    }

    return NextResponse.json({ projects, lastProject });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Не удалось получить проекты",
      },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getUserSession();

    if (!session) {
      return NextResponse.json(
        {
          message: "Неавторизованный пользователь",
        },
        { status: 401 },
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        id: Number(session.id),
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "Неавторизованный пользователь",
        },
        { status: 401 },
      );
    }

    const data = (await req.json()) as CreateProjectData;

    const project = await prisma.project.create({
      data: {
        name: data.name,
        userId: user.id,
      },
    });

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        lastProjectId: project.id,
      },
    });

    const projects = await prisma.project.findMany({
      where: { userId: user.id },
    });

    return NextResponse.json({ projects, lastProject: project });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Не удалось получить проекты",
      },
      { status: 500 },
    );
  }
}