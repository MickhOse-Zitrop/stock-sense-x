"use server";

import { prisma } from "@/prisma/prisma";
import { Prisma } from "./generated/prisma/client";
import { hashSync } from "bcrypt";
import { getUserSession } from "@/lib/get-user-session";

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: { email: body.email },
    });

    if (user) {
      if (!user.verified) {
        throw new Error("Почта не подтверждена");
      }

      throw new Error("Пользователь существует");
    }

    await prisma.user.create({
      data: {
        name: "User",
        email: body.email,
        password: hashSync(body.password, 10),
        verified: new Date(),
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const updateAvatar = async (body: { imageUrl: string }) => {
  try {
    const session = await getUserSession();

    if (!session) {
      throw new Error("Войдите в аккаунт!");
    }

    const user = await prisma.user.findFirst({
      where: { id: Number(session.id) },
    });

    if (!user) {
      throw new Error("Неизвестный аккаунт");
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        imageUrl: body.imageUrl,
      },
    });

    return "Изображение успешно изменено";
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error("No user session found");
    }

    const findUser = await prisma.user.findFirst({
      where: { id: Number(currentUser.id) },
    });

    await prisma.user.update({
      where: { id: Number(currentUser.id) },
      data: {
        name: body.name ? body.name : findUser?.name,
        company: body.company ? body.company : findUser?.company,
        showCompany: body.showCompany
          ? body.showCompany
          : findUser?.showCompany,
        email: body.email ? body.email : findUser?.email,
      },
    });
  } catch (error) {
    throw new Error(`Error [UPDATE_USER_INFO] ${error}`);
  }
}

export async function uploadData(body: {
  id: number;
  userId: number;
  url: string;
}) {
  try {
    const session = await getUserSession();

    if (!session) {
      throw new Error("Войдите в аккаунт!");
    }

    const user = await prisma.user.findFirst({
      where: { id: Number(session.id) },
    });

    if (!user) {
      throw new Error("Неизвестный аккаунт");
    }

    const project = await prisma.project.findFirst({
      where: { id: body.id },
    });

    if (!project) throw new Error("Неизвестный проект");

    await prisma.project.update({
      where: {
        id: project.id,
      },
      data: {
        dataUrl: body.url,
      },
    });

    return "Данные успешно загружены";
  } catch (error) {
    console.log(error);
    throw error;
  }
}