import { ISalaryPayment, ISalaryReport } from '@/types/salary-payment';
import React, { FC } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { dateFormatter } from '@/lib/dateFormatter';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Eye } from 'lucide-react';

export interface PaymentDialogProps {
    report: ISalaryReport;
}

const PaymentsDialog: FC<PaymentDialogProps> = ({ report }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size={'icon'}><Eye/></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Payments</DialogTitle>
                    <DialogDescription>
                        Payments for {report.date.month} {report.date.year}
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-72 mt-4">
                    <div className="space-y-4 ">
                        {report.payments.map((payment, index) => (
                            <div
                                key={index}
                                className="p-4 border rounded-lg bg-muted flex flex-col gap-3"
                            >
                                <div className="text-sm font-medium text-primary">
                                    Amount: <span className="font-semibold">${payment.amount}</span>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Date: {dateFormatter(payment.date.toString())}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Type: {payment.type}
                                </div>
                                {payment.description && (
                                    <div className="text-sm text-muted-foreground">
                                        Note: {payment.description}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};

export default PaymentsDialog;
