import { LoadingSpinner } from "@/components/common/loading-spinner";

export default function Loading() {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
                <div className="flex flex-col items-center gap-2">
                    <LoadingSpinner size="md" />
                    <span className="text-sm text-muted-foreground">Loading...</span>
                </div>
            </div>
        </div>
    )
}