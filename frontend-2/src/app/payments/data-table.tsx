"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DataTablePagination } from "./data-table-2"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
} from "@radix-ui/react-icons"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    count: number,
}

export function DataTable<TData, TValue>({
    columns,
    data,
    count,
}: DataTableProps<TData, TValue>) {

    const router = useRouter();
    const [pagination, setPagination] = useState({
        pageSize: 2,
        pageIndex: 0,
    });
    const [sorting, setSorting] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');

    useEffect(() => {
        const sortField = sorting.length ? sorting[0].id : '';
        const sortOrder = sorting.length && sorting[0].desc ? 'desc' : 'asc';

        let param = `?page=${table.getState().pagination.pageIndex + 1}&pageSize=${table.getState().pagination.pageSize}`;
        if (sortField && sortOrder) {
            param += `&sortField=${sortField}&sortOrder=${sortOrder}`;
        }
        if (globalFilter.length > 1) {
            param += `&search=${globalFilter}`;
        }
        router.push(param);

    }, [pagination, sorting, globalFilter]);

    const table = useReactTable({
        data,
        columns,
        state: {
            pagination,
            sorting: sorting,
            globalFilter,
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        pageCount: Math.ceil(count / pagination.pageSize),
        manualPagination: true,
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        manualSorting: true,
        sortDescFirst: false,

        onGlobalFilterChange: setGlobalFilter,
        manualFiltering: true,
    })

    console.log(sorting);
    return (
        <div>
            <div className="flex mb-2">
                <Input type="text" placeholder="search..." value={globalFilter} onChange={e => setGlobalFilter(e.target.value)} className="mx-auto w-max" />
            </div>
            <div className="rounded-md border">

                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead className=" cursor-pointer hover:bg-gray-100 " key={header.id}
                                            onClick={header.column.getToggleSortingHandler()}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                            {{ 'asc': '↑', 'desc': '↓', 'non': '' }[header.column.getIsSorted() == 'desc' ? 'desc' : (header.column.getIsSorted() == 'asc' ? 'asc' : 'non')]}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {/* Pagination Buttons */}
            <div className="flex items-center justify-center space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
            {/* =========================================== */}
            {/* <DataTablePagination table={table} /> */}
            <div className="flex items-center justify-between px-2">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium">Rows per page: {table.getState().pagination.pageSize}</p>
                        <Select
                            value={`${table.getState().pagination.pageSize}`}
                            onValueChange={(value) => {
                                table.setPageSize(Number(value))
                            }}

                        >
                            <SelectTrigger className="h-8 w-[70px]">
                                <SelectValue placeholder={table.getState().pagination.pageSize} />
                            </SelectTrigger>
                            <SelectContent side="top">
                                {[1, 2, 3, 4, 5].map((pageSize) => (
                                    <SelectItem key={pageSize} value={`${pageSize}`}>
                                        {pageSize}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                        Page {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            className="hidden h-8 w-8 p-0 lg:flex"
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <span className="sr-only">Go to first page</span>
                            <DoubleArrowLeftIcon className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <span className="sr-only">Go to previous page</span>
                            <ChevronLeftIcon className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            <span className="sr-only">Go to next page</span>
                            <ChevronRightIcon className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            className="hidden h-8 w-8 p-0 lg:flex"
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            disabled={!table.getCanNextPage()}
                        >
                            <span className="sr-only">Go to last page</span>
                            <DoubleArrowRightIcon className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}