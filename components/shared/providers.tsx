"use client";

import React, { PropsWithChildren } from "react";
import { Toaster } from "@/components/ui";
import { SessionProvider } from "next-auth/react";
import NextTopLoader from "nextjs-toploader";

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <SessionProvider>{children}</SessionProvider>
      <Toaster />
      <NextTopLoader color="#1447e6" />
    </>
  );
};