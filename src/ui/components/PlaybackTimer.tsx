import { duration } from "../lib/usePlayback";

type PlaybackTimerProps = {
  storyIndex: number;
  storyCount: number;
  elapsed: number;
};

export function PlaybackTimer({
  storyIndex,
  storyCount,
  elapsed,
}: Readonly<PlaybackTimerProps>) {
  return (
    <>
      <progress
        className="timer-progress"
        aria-label={`${storyIndex + 1} of ${storyCount} stories shown`}
        max={duration}
        value={elapsed}
      />
      <div className="timer" aria-hidden="true">
        <span className="timer-track">
          <span
            className="timer-fill"
            style={{ width: `${(elapsed / duration) * 100}%` }}
          />
        </span>
      </div>
    </>
  );
}
