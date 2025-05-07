import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import React, { FC } from 'react';
export interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isSubmitting: boolean;
    text:string
}
const SubmitButton: FC<SubmitButtonProps> = ({ text, isSubmitting, ...props }) => {
    return (
        <Button type="submit" disabled={isSubmitting} {...props}>
            {isSubmitting ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                </>
            ) : (
                text
            )}
        </Button>
    );
};

export default SubmitButton;