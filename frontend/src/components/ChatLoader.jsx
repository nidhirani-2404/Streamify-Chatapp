import { LoaderIcon } from "lucide-react";

function ChatLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
      <div className="flex flex-col items-center gap-4">
        <LoaderIcon className="w-8 h-8 animate-spin text-primary" />
        <p className="text-base-content/70">Connecting to chat...</p>
      </div>
    </div>
  );
} 

export default ChatLoader;
// export default ChatLoader;