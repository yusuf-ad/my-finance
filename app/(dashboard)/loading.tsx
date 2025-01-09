import { Loader2 } from "lucide-react";

function Loading() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <Loader2 className="animate-spin" size={50} />
    </div>
  );
}

export default Loading;
