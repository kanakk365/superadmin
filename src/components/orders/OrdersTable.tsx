"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { IconSearch } from "@/lib/icons";
import { ListFilter, ArrowUpDown } from "lucide-react";
import { Checkbox } from "./Checkbox";
import { StatusBadge } from "./StatusBadge";
import { Avatar } from "../ui/Avatar";
import { Pagination } from "./Pagination";
import { PlusIcon, CalendarIcon, EllipsisIcon } from "./OrdersIcons";
import { orders, actionButtonClass } from "./constants";
import { useState, useMemo } from "react";

export const OrdersTable = () => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Create a unique key for each row (id + index to handle duplicates)
  const orderKeys = useMemo(
    () => orders.map((_, index) => `${orders[index].id}-${index}`),
    []
  );

  const isAllSelected =
    selectedIds.size === orderKeys.length && orderKeys.length > 0;
  const isSomeSelected =
    selectedIds.size > 0 && selectedIds.size < orderKeys.length;

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(orderKeys));
    }
  };

  const handleSelectRow = (key: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(key)) {
      newSelected.delete(key);
    } else {
      newSelected.add(key);
    }
    setSelectedIds(newSelected);
  };

  return (
    <ScrollArea
      className="h-full w-full"
      viewportClassName="min-w-full"
      orientation="both"
    >
      <div className="flex flex-col gap-6 px-4 py-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h1 className="text-lg font-semibold text-foreground">
              Orders List
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-muted p-2 ">
          <div className="flex items-center gap-1">
            <button type="button" className={actionButtonClass}>
              <PlusIcon />
              <span className="sr-only">Add order</span>
            </button>
            <button type="button" className={actionButtonClass}>
              <ListFilter className="h-3 w-3" />
              <span className="sr-only">Filter orders</span>
            </button>
            <button type="button" className={actionButtonClass}>
              <ArrowUpDown className="h-3 w-3" />
              <span className="sr-only">Sort orders</span>
            </button>
          </div>

          <div className="relative w-full max-w-[260px]  ">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
              <IconSearch className="h-4 w-4 text-muted-foreground" />
            </span>
            <input
              type="search"
              placeholder="Search"
              className="h-9 w-full rounded-lg border border-border bg-card pl-10 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl bg-background">
          <div className="min-w-[1100px]">
            <table className="min-w-full table-fixed">
              <thead className="text-xs font-semibold text-muted-foreground">
                <tr className="border-b border-border">
                  <th scope="col" className="w-2 sm:w-8 py-2 text-left">
                    <Checkbox
                      checked={isAllSelected}
                      onClick={handleSelectAll}
                    />
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-2 text-left text-sm font-thin text-foreground"
                  >
                    Order ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-2 text-left text-sm font-thin text-foreground"
                  >
                    User
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-2 text-left text-sm font-thin text-foreground"
                  >
                    Project
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-2 text-left text-sm font-thin text-foreground"
                  >
                    Address
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-2 text-left text-sm font-thin text-foreground"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-2 text-left text-sm font-thin text-foreground"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-2 text-right text-sm font-thin"
                    aria-label="Actions"
                  />
                </tr>
              </thead>
              <tbody className="text-sm text-foreground">
                {orders.map((order, index) => {
                  const rowKey = `${order.id}-${index}`;
                  const isSelected = selectedIds.has(rowKey);
                  return (
                    <tr
                      key={rowKey}
                      className={cn(
                        "transition border-b border-border hover:bg-muted/70 dark:hover:bg-muted/30",
                        isSelected
                          ? "bg-secondary/20 text-secondary-foreground"
                          : ""
                      )}
                    >
                      <td className="w-8 py-2 align-middle">
                        <Checkbox
                          checked={isSelected}
                          onClick={() => handleSelectRow(rowKey)}
                        />
                      </td>
                      <td className="px-6 py-2 align-middle text-foreground">
                        {order.id}
                      </td>
                      <td className="px-6 py-2 align-middle">
                        <div className="flex items-center gap-3">
                          <Avatar {...order.user} />
                          <span className="text-foreground">
                            {order.user.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-2 align-middle text-foreground">
                        {order.project}
                      </td>
                      <td className="px-6 py-2 align-middle text-foreground">
                        <span className="block truncate">{order.address}</span>
                      </td>
                      <td className="px-6 py-2 align-middle text-muted-foreground">
                        <span className="flex items-center gap-2">
                          {order.dateLabel}
                        </span>
                      </td>
                      <td className="px-6 py-2 align-middle">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="px-6 py-2 align-middle text-right">
                        <button
                          type="button"
                          className="inline-flex justify-end text-muted-foreground hover:text-foreground"
                        >
                          <span className="sr-only">More actions</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Pagination />
        </div>
      </div>
    </ScrollArea>
  );
};
