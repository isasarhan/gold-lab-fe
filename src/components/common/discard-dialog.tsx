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
import { FC } from "react"


export interface ConfirmDialogProps {
    onConfirm(): void
    title: string
    text: string
    description: string
    children: React.ReactNode
}
const ConfirmDialog: FC<ConfirmDialogProps> = ({ children, onConfirm, title, description }) => {

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogTrigger asChild>
                        <Button variant={'secondary'} >Cancel</Button>
                    </DialogTrigger>
                    <DialogTrigger asChild>
                        <Button onClick={onConfirm}>Confirm</Button>
                    </DialogTrigger>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
export default ConfirmDialog;
