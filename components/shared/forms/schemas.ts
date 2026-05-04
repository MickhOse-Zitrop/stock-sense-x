import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(6, { message: "Пароль должен содержать не менее 6 символов" });

export const emailSchema = z.email({ message: "Введите корректную почту" });

export const formLoginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const emailObjectSchema = z.object({
  email: emailSchema,
});

export const formRegisterSchema = formLoginSchema
  .extend({
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export const formEditSchema = z.object({
  name: z.string().min(5, { message: "Введите корректное отображаемое имя" }),
  company: z.string().min(2, { message: "Введите корректное имя" }),
  showCompany: z.boolean(),
  email: emailSchema,
});

export const formNewProjectSchema = z.object({
  name: z.string().min(1, { message: "Название не менее 1 символа" }),
});

export const formEditProjectSchema = z.object({
  name: z.string().min(1, { message: "Название не менее 1 символа" }),
  description: z
    .string()
    .min(5, { message: "Описание не менее 5 символов" })
    .max(256, { message: "Описание не более 256 символов" }),
});

export type TFormLoginValues = z.infer<typeof formLoginSchema>;
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;
export type TFormEditValues = z.infer<typeof formEditSchema>;
export type TFormNewProjectValues = z.infer<typeof formNewProjectSchema>;
export type TFormEditProjectValues = z.infer<typeof formEditProjectSchema>;
export type TEmailSchema = z.infer<typeof emailObjectSchema>;