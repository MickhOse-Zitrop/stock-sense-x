"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button, Checkbox, FieldGroup, Label, Spinner } from "@/components/ui";
import { FormProvider, useForm } from "react-hook-form";
import { formRegisterSchema, TFormRegisterValues } from "./forms/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { registerUser } from "@/app/actions";
import { FormInput } from "@/components/shared/form-input";

interface Props {
  className?: string;
}

export const SignUpForm: React.FC<Props> = ({ className }) => {
  const form = useForm<TFormRegisterValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      await registerUser({
        email: data.email,
        password: data.password,
      });

      toast.success("Регистрация прошла успешно! Войдите в свой аккаунт");
    } catch (error) {
      console.log("Error register ", error);
      toast.error(`${(error as Error).message}`);
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
          <FormInput
            name={"confirmPassword"}
            id={"confirmPassword"}
            placeholder="Повторите пароль"
            type="password"
          />
          <div className="flex gap-3">
            <Checkbox id="terms" required className="mt-1 cursor-pointer" />
            <Label
              htmlFor="terms"
              className="inline leading-5 text-muted-foreground"
            >
              Я прочел(-ла) и соглашаюсь с{" "}
              <a href="" className="text-primary underline">
                Пользовательским соглашением
              </a>{" "}
              и{" "}
              <a href="" className="text-primary underline">
                Политикой конфиденциальности
              </a>
              .
            </Label>
          </div>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && <Spinner />}
            Зарегестрироваться
          </Button>
        </FieldGroup>
      </form>
    </FormProvider>
  );
};