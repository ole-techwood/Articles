import { Pause, Play } from "lucide-react";
import { Button } from "./ui/button";

type PlaybackToggleProps = {
  playing: boolean;
  onToggle: () => void;
};

export function PlaybackToggle({
  playing,
  onToggle,
}: Readonly<PlaybackToggleProps>) {
  return (
    <Button
      className="playback-control"
      variant="outline"
      size="icon"
      type="button"
      aria-label={playing ? "Pause story playback" : "Play story playback"}
      aria-pressed={!playing}
      onClick={onToggle}
    >
      {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
    </Button>
  );
}
