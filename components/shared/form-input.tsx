"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import {
  Checkbox,
  Field,
  FieldError,
  FieldLabel,
  Input,
  Textarea,
} from "@/components/ui";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  id: string;
  required?: boolean;
  className?: string;
  checkbox?: boolean;
  textarea?: boolean;
}

export const FormInput: React.FC<Props> = ({
  name,
  label,
  id,
  required,
  className,
  disabled,
  checkbox = false,
  textarea = false,
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorText = errors[name]?.message as string;

  return (
    <Field
      className={className}
      orientation={checkbox ? "horizontal" : "vertical"}
    >
      {checkbox ? (
        <>
          <Checkbox
            id={id}
            required={required}
            disabled={disabled}
            {...register(name)}
          />
          {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}
        </>
      ) : textarea ? (
        <>
          {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}
          <Textarea
            id={id}
            disabled={disabled}
            required={required}
            {...register(name)}
          />
        </>
      ) : (
        <>
          {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}
          <Input
            id={id}
            disabled={disabled}
            required={required}
            {...register(name)}
            {...props}
          />
        </>
      )}
      <FieldError>{errorText}</FieldError>
    </Field>
  );
};