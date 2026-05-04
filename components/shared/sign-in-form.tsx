"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button, FieldGroup, Spinner } from "@/components/ui";
import Link from "next/link";
import { FormInput } from "@/components/shared";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  formLoginSchema,
  TFormLoginValues,
} from "@/components/shared/forms/schemas";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  className?: string;
}

export const SignInForm: React.FC<Props> = ({ className }) => {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<TFormLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: TFormLoginValues) => {
    try {
      const resp = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (!resp?.ok) {
        throw Error();
      }

      toast.success("Вы успешно вошли в аккаунт");

      if (
        [
          "/analysis",
          "/dashboard",
          "/forecast",
          "/inventory",
          "/upload-data",
        ].includes(pathname)
      )
        router.refresh();
      else router.push("/upload-data");
    } catch (error) {
      console.log("Error login ", error);
      toast.error("Не удалось войти в аккаунт");
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className={cn("my-3", className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldGroup>
          <FormInput
            name={"email"}
            id={"email"}
            placeholder="Email"
            type="email"
          />
          <FormInput
            name={"password"}
            id={"password"}
            placeholder="Пароль"
            type="password"
          />
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && <Spinner />}
            Войти
          </Button>
          <Link
            href={""}
            className="text-primary text-sm underline text-center"
          >
            Забыли пароль?
          </Link>
        </FieldGroup>
      </form>
    </FormProvider>
  );
};