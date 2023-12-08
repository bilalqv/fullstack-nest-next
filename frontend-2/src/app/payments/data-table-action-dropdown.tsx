import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Edit, MoreHorizontalIcon, Trash2Icon } from "lucide-react"
import { useState } from "react"
import DeleteDialog from "./delete-dialog";
import EditDialog from "./edit-dialog";


export default function DataTableActionDropdown({ row }: any) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <MoreHorizontalIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Action</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
                    <Edit className=" mr-3 h-4 w-4" />
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowDeleteDialog(true)}>
                    <Trash2Icon className=" mr-3 h-4 w-4" />
                    Delete
                </DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>



            <DeleteDialog
                id={row.id}
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
            />

            <EditDialog
            row={row}
            open={showEditDialog}
            onOpenChange={setShowEditDialog}
            />


        </DropdownMenu>
    )
}