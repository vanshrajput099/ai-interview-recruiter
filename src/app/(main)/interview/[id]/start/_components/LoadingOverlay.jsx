import { Loader2 } from "lucide-react";

export function LoadingOverlay() {
    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-white" />
        </div>
    );
}
