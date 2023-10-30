import { getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { type } from "os";

async function getData(page: number, pageSize: number, sortField: string, sortOrder: string, search: string): Promise<any> {
    // Fetch data from your API here.
    // return [
    //     {
    //         id: "728ed52f",
    //         amount: 100,
    //         status: "pending",
    //         email: "m@example.com",
    //     },
    //     {
    //         id: "489e1d42",
    //         amount: 125,
    //         status: "processing",
    //         email: "dsf@gfdg.com",
    //     },
    //     {
    //         id: "f8d8c8a2",
    //         amount: 100,
    //         status: "success",
    //         email: "asd@ds.com",
    //     },
    //     {
    //         id: "a0f6e8d9",
    //         amount: 100,
    //         status: "failed",
    //         email: "dgfsdgff@adf.com",
    //     },
    // ]

    const response = await fetch(`http://localhost:3003/users/all?page=${page}&pageSize=${pageSize}&sortField=${sortField}&sortOrder=${sortOrder}&search=${search}`);
    const data = await response.json();
    // console.log('data=', data);
    return data;
}

export type searchParams = {
    page: number,
    pageSize: number,
    sortField: string,
    sortOrder: string,
    search: string,
}

export default async function DemoPage({
    searchParams,
}: {
    searchParams: searchParams
}) {
    const page = searchParams.page || 1;
    const pageSize = searchParams.pageSize || 2;
    const sortField = searchParams.sortField || '';
    const sortOrder = searchParams.sortOrder || '';
    const search = searchParams.search || '';
    const { data, count } = await getData(page, pageSize, sortField, sortOrder, search);

    return (
        <div className="container mx-auto py-10 mt-8">
            <DataTable columns={columns} data={data} count={count} />
        </div>
    )
}