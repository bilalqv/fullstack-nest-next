"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, MoreHorizontalIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import DataTableActionDropdown from "./data-table-action-dropdown"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type User = {
    id: string
    firstName: string
    lastName: string
    email: string
    createdAt: string
}

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "firstName",
        header: "First Name",
    },
    {
        accessorKey: "lastName",
        header: "Last Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "createdAt",
        header: "Created",
        cell: ({ row }) => {
            const createdAtDate = new Date(row.original.createdAt);

            // Format the date as MM-DD-YYYY
            const formattedDate = createdAtDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            });
            return formattedDate;
        }
    },
    {
        header: "Actions",
        cell: ({ row }) => (
            <div>
                <DataTableActionDropdown row={row.original} />
            </div>
        ),
    }

]