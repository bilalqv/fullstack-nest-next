import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";


export default function DeleteDialog({ id, open, onOpenChange }: any) {

    const { toast } = useToast();
    const router = useRouter();

    async function onDelete() {
        console.log('onDelete');
        const response = await fetch(`http://localhost:3003/users/${id}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        console.log('data del=', data);
        if (!data.success) {
            toast({
                title: 'Something went wrong.',
                description: "Unable to delete your account.",
                variant: 'destructive'
            });
            return;
        }
        toast({
            title: 'Account deleted.',
            description: "We've deleted your account for you.",
        });
        router.refresh();
        onOpenChange(false);

    }

    function onCancel() {
        console.log('onCancel');
        onOpenChange(false);
    }

    return (
        <Dialog open={open}>
            {/* <DialogTrigger>Open</DialogTrigger> */}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <div className="flex w-full flex-1 flex-nowrap gap-4">
                        <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            onClick={onDelete}
                            className="flex-1"
                            variant="destructive"
                        >
                            Delete
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}