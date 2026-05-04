"use client";

import React, { PropsWithChildren } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Separator,
  Spinner,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui";
import { SignInForm } from "@/components/shared/sign-in-form";
import { SignUpForm } from "@/components/shared/sign-up-form";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useProjects } from "@/hooks";

interface Props {
  className?: string;
}

export const LoginDialog: React.FC<PropsWithChildren<Props>> = ({
  children,
}) => {
  const { data, status } = useSession();
  const user = data?.user;
  const router = useRouter();
  const { lastProject } = useProjects();

  return status === "loading" ? (
    <Button disabled>
      <Spinner />
    </Button>
  ) : !user ? (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle />
        </DialogHeader>
        <Tabs defaultValue="sign-in">
          <TabsList variant="line" className="w-full">
            <TabsTrigger value="sign-in">Вход</TabsTrigger>
            <TabsTrigger value="sign-up">Регистрация</TabsTrigger>
          </TabsList>
          <TabsContent value={"sign-in"}>
            <SignInForm />
          </TabsContent>
          <TabsContent value={"sign-up"}>
            <SignUpForm />
          </TabsContent>
          <Separator />
          <div className="mt-3 flex items-center justify-center gap-5">
            <Button
              variant="secondary"
              size="icon"
              className="shadow"
              onClick={() =>
                signIn("google", { callbackUrl: "/", redirect: true })
              }
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/google.svg" alt="Google" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="shadow"
              onClick={() =>
                signIn("yandex", { callbackUrl: "/", redirect: true })
              }
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/yandex.svg" alt="Yandex" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="shadow"
              disabled
              onClick={() =>
                signIn("apple", { callbackUrl: "/", redirect: true })
              }
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/apple.svg" alt="Apple" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="shadow"
              disabled
              onClick={() =>
                signIn("github", { callbackUrl: "/", redirect: true })
              }
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/github.svg" alt="Github" />
            </Button>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  ) : (
    <Button
      variant="secondary"
      onClick={() => router.push(`/${lastProject?.id}`)}
    >
      {user.name}
    </Button>
  );
};