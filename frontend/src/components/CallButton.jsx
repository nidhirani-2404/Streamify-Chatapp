import { VideoIcon } from "lucide-react";

function CallButton({ handleVideoCall }) {
  return (
    <button
      onClick={handleVideoCall}
      className="btn btn-secondary btn-sm gap-2"
      title="Start Video Call"
    >
      <VideoIcon size={16} />
      Video Call
    </button>
  );
}

export default CallButton;