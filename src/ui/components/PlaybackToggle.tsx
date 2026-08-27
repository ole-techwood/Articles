import { Pause, Play, RotateCcw } from "lucide-react";

type PlaybackToggleProps = {
  playing: boolean;
  atEnd: boolean;
  onToggle: () => void;
};

export function PlaybackToggle({ playing, atEnd, onToggle }: PlaybackToggleProps) {
  const label = atEnd ? "Replay Story Sequence" : playing ? "Pause playback" : "Resume playback";
  const Icon = atEnd ? RotateCcw : playing ? Pause : Play;

  return (
    <button className="playback-toggle" type="button" aria-label={label} onClick={onToggle}>
      <Icon aria-hidden="true" />
    </button>
  );
}