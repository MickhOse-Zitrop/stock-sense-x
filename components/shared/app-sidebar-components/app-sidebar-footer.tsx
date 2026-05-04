import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui";
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogIn,
  LogOut,
  Sparkles,
  User2,
} from "lucide-react";
import Link from "next/link";
import { LoginDialog } from "@/components/shared";
import { User } from "@/app/generated/prisma/client";
import { signOut } from "next-auth/react";

interface Props {
  user?: User;
  className?: string;
}

export const AppSidebarFooter: React.FC<Props> = ({ className, user }) => {
  const { isMobile } = useSidebar();

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={user.imageUrl || ""}
                      alt={user.name || ""}
                    />
                    <AvatarFallback className="rounded-lg">
                      {user.name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {user.showCompany ? user.company : user.name}
                    </span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                  {user.role === "PRO" && <Sparkles className="text-primary" />}
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage
                          src={user.imageUrl || ""}
                          alt={user.name || ""}
                        />
                        <AvatarFallback className="rounded-lg">
                          {user.name?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium text-foreground">
                          {user.name}
                        </span>
                        <span className="truncate text-xs">{user.email}</span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link href="/pro">
                    <DropdownMenuItem>
                      <Sparkles />
                      {user.role === "PRO" ? "Pro" : "Улучшить до Pro"}
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link href="/account">
                    <DropdownMenuItem>
                      <BadgeCheck />
                      Аккаунт
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem disabled>
                    <CreditCard />
                    Счет
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled>
                    <Bell />
                    Уведомления
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() =>
                      signOut({ redirect: true, callbackUrl: "/" })
                    }
                  >
                    <LogOut />
                    Выйти
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <LoginDialog>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarFallback className="rounded-lg">
                    <User2 />
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Войти в аккаунт</span>
                </div>
                {/*<Sparkles className="text-primary" />*/}
                <LogIn className="ml-auto size-4" />
              </SidebarMenuButton>
            </LoginDialog>
          )}
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
};