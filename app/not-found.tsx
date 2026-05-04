import { ArchiveX } from "lucide-react";
import { Button } from "@/components/ui";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex-1 w-fit flex flex-col gap-6 items-center justify-center">
      <div className="flex gap-10 items-center">
        <ArchiveX size={164} />
        <h1 className="flex flex-col gap-4 items-center">
          <span className="text-5xl font-bold">404</span>
          <span>Страница не найдена</span>
        </h1>
      </div>
      <Link href={"/"} className="w-full">
        <Button size="lg" className="w-full">
          На главную
        </Button>
      </Link>
    </div>
  );
}