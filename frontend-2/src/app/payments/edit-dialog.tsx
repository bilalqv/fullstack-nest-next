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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ZEditFormSchema = z.object({
    firstName: z.string().trim().min(1, { message: 'Please enter a valid first name.' }),
    lastName: z.string().trim().min(1, { message: 'Please enter a valid last name.' }),
    email: z.string().email().min(1),
});

type TEditFormSchema = z.infer<typeof ZEditFormSchema>;


export default function EditDialog({ open, onOpenChange, row }: any) {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<TEditFormSchema>({
        defaultValues: {
            firstName: row.firstName,
            lastName: row.lastName,
            email: row.email,
        },
        resolver: zodResolver(ZEditFormSchema),
    })

    const { toast } = useToast();
    const router = useRouter();

    async function onFormSubmit({ firstName, lastName, email }: TEditFormSchema) {
        console.log('onFormSubmit');
        const ress = await fetch(`http://localhost:3003/users/${row.id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify({ firstName, lastName, email }),
        });
        const data = await ress.json();
        if (!data.success) {
            toast({
                title: 'Something went wrong.',
                description: "Unable to update your account.",
                variant: 'destructive'
            });
            return;
        }
        toast({
            title: 'Account updated.',
            description: "We've updated your account for you.",
        })
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
                <div>
                    <form onSubmit={handleSubmit(onFormSubmit)}>

                        <div>
                            <Label htmlFor="firstName">First Name</Label>
                            <Input className="mt-2 mb-4" id="firstName" type="text" placeholder="First Name" {...register('firstName')} />
                            {errors.firstName && <span className="mt-1 text-xs text-red-500">{errors.firstName.message}</span>}
                        </div>

                        <div>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input className="mt-2 mb-4" id="lastName" type="text" placeholder="Last Name" {...register('lastName')} />
                            {errors.lastName && <span className="mt-1 text-xs text-red-500">{errors.lastName.message}</span>}
                        </div>

                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input className="mt-2 mb-4" id="email" type="email" placeholder="Email" {...register('email')} />
                            {errors.email && <span className="mt-1 text-xs text-red-500">{errors.email.message}</span>}
                        </div>


                        <DialogFooter>
                            <div className="flex w-full flex-1 flex-nowrap gap-4">
                                <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-1"
                                >
                                    Confirm
                                </Button>
                            </div>
                        </DialogFooter>
                    </form>
                </div>

            </DialogContent>
        </Dialog>

    )
}