"use client";

import React from "react";
import {
  Badge,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import { AnalyzedItem } from "@/lib/analytics";

interface Props {
  data: AnalyzedItem[];
  className?: string;
}

export const TableAnalysis: React.FC<Props> = ({ className, data }) => {
  const [fullScreen, setFullScreen] = React.useState(false);
  const showMore = data.length > 9;

  return (
    <>
      <div
        className={cn(className, "overflow-hidden", !fullScreen && "max-h-96")}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Товар</TableHead>
              <TableHead>Категория</TableHead>
              <TableHead>Выручка</TableHead>
              <TableHead>Вариация</TableHead>
              <TableHead>Стратегия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((product) => (
              <TableRow className="border-muted" key={product.name}>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  <Badge>{product.group}</Badge>
                </TableCell>
                <TableCell className="font-semibold">
                  {product.revenue}
                </TableCell>
                <TableCell>{product.variation}</TableCell>
                <TableCell>{product.strategy}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {showMore && (
        <div className="w-full text-center mt-2">
          <Button variant="outline" onClick={() => setFullScreen(!fullScreen)}>
            {fullScreen ? "Свернуть" : "Показать все"}
          </Button>
        </div>
      )}
    </>
  );
};