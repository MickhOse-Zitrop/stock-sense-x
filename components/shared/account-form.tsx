"use client";

import React from "react";
import {
  AlertDialogCancel,
  AlertDialogFooter,
  Button,
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  Separator,
  Spinner,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import { Check, KeyRound, Link, PackageX, Trash } from "lucide-react";
import { User } from "@/app/generated/prisma/client";
import { AvatarEdit } from "@/components/shared/avatar-edit";
import { FormProvider, useForm } from "react-hook-form";
import {
  formEditSchema,
  TFormEditValues,
} from "@/components/shared/forms/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/shared/form-input";
import { toast } from "sonner";
import { updateUserInfo } from "@/app/actions";

interface Props {
  user: User;
  dialog?: boolean;
  className?: string;
}

export const AccountForm: React.FC<Props> = ({
  className,
  user,
  dialog = false,
}) => {
  const form = useForm<TFormEditValues>({
    resolver: zodResolver(formEditSchema),
    defaultValues: {
      name: user.name || "",
      company: user.company || "",
      showCompany: user.showCompany,
      email: user.email,
    },
  });

  const onSubmit = async (data: TFormEditValues) => {
    try {
      await updateUserInfo({
        name: data.name,
        company: data.company,
        showCompany: data.showCompany,
        email: data.email,
      });

      toast.success("Данные успешно обновлены");
    } catch (e) {
      return toast.error("Ошибка при обновлении данных", {
        action: {
          label: "Сообщить об ошибке",
          onClick: () => console.log(e),
        },
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form className="" onSubmit={form.handleSubmit(onSubmit)}>
        <div className={cn("flex flex-col gap-3 p-2", className)}>
          <AvatarEdit user={user} />
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Основные настройки</FieldLegend>
              <FieldDescription>
                Эти настройки видны только вам
              </FieldDescription>
              <FieldGroup>
                <FormInput name={"name"} id={"name"} label={"Ваше имя"} />
                <FormInput
                  name={"company"}
                  id={"company"}
                  label={"Название компании"}
                />
                <FormInput
                  name={"showCompany"}
                  id={"showCompany"}
                  label={"Отображать название компании вместо имени"}
                  checkbox
                />
              </FieldGroup>
            </FieldSet>
            <FieldSeparator />
            <FieldSet>
              <FieldLegend>Настройки входа</FieldLegend>
              <FieldGroup>
                <FormInput
                  name={"email"}
                  id={"email"}
                  label={"Email"}
                  placeholder="email@example.com"
                  type="email"
                />
                <Field>
                  <FieldLabel>Пароль</FieldLabel>
                  <Button variant="secondary" disabled={!user.password}>
                    <KeyRound />
                    Сменить пароль
                  </Button>
                </Field>
                <FieldSeparator />
                {["Google", "Yandex", "Github", "Apple"].map((provider) => (
                  <Field key={provider}>
                    <FieldLabel>{provider}</FieldLabel>
                    {provider.toLowerCase() === user.provider ? (
                      <div className="flex items-center">
                        <Button className="flex-1">
                          <Check />
                          Подключен
                        </Button>
                        <Button variant="destructive">Отвязать</Button>
                      </div>
                    ) : (
                      <Button variant="secondary">
                        <Link />
                        Подключить
                      </Button>
                    )}
                  </Field>
                ))}
              </FieldGroup>
            </FieldSet>
            <FieldSeparator />
            <FieldSet>
              <FieldLegend className="text-destructive">
                Опасная зона
              </FieldLegend>
              <FieldGroup>
                <Field>
                  <FieldLabel>Удаление всех проектов</FieldLabel>
                  <FieldDescription>
                    Все ваши данные, кроме аккаунта, будут навсегда удалены с
                    сайта
                  </FieldDescription>
                  <Button variant="destructive">
                    <PackageX />
                    Удалить данные
                  </Button>
                </Field>
                <Field>
                  <FieldLabel>Удаление аккаунта</FieldLabel>
                  <FieldDescription>
                    Ваш профиль и вся информация, связанная с ним, исчезнут
                    безвозвратно
                  </FieldDescription>
                  <Button variant="destructive">
                    <Trash />
                    Удалить аккаунт
                  </Button>
                </Field>
              </FieldGroup>
            </FieldSet>
          </FieldGroup>
        </div>
        {dialog ? (
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button
                variant="outline"
                onClick={() => form.reset()}
                disabled={form.formState.isSubmitting}
                type="reset"
              >
                Отменить
              </Button>
            </AlertDialogCancel>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && <Spinner />}
              Сохранить изменения
            </Button>
          </AlertDialogFooter>
        ) : (
          <div className="w-full flex flex-col gap-4 items-end">
            <Separator />
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => form.reset()}
                disabled={form.formState.isSubmitting}
                type="reset"
              >
                Отменить
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && <Spinner />}
                Сохранить изменения
              </Button>
            </div>
          </div>
        )}
      </form>
    </FormProvider>
  );
};