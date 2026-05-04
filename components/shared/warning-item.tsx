import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import { AlertCircle } from "lucide-react";

interface Props {
  alert?: boolean;
  id: number;
  description: string;
  className?: string;
}

export const WarningItem: React.FC<Props> = ({
  className,
  alert = false,
  id,
  description,
}) => {
  return (
    <div
      className={cn(
        "flex justify-between shadow-sm p-4 border-l-4 rounded-lg",
        alert
          ? "border-destructive bg-destructive/10"
          : "border-orange-500 bg-orange-500/10",
        className,
      )}
    >
      <div className="flex gap-3">
        <AlertCircle
          className={alert ? "text-destructive" : "text-orange-500"}
        />
        <div className="flex flex-col gap-1">
          <p className="font-medium">Товар #{id}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <Button variant="link">Подробнее</Button>
    </div>
  );
};