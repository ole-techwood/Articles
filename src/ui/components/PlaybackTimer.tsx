type PlaybackTimerProps = {
  storyCount: number;
  storyIndex: number;
};

export function PlaybackTimer({
  storyCount,
  storyIndex,
}: Readonly<PlaybackTimerProps>) {
  return (
    <div
      className="progress-timer"
      aria-label={`Story ${storyIndex + 1} of ${storyCount}`}
    >
      {Array.from({ length: storyCount }, (_, index) => {
        const value = index <= storyIndex ? 100 : 0;
        return (
          <div
            className="progress-segment"
            key={index}
            role="progressbar"
            aria-label={`Story ${index + 1} progress`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(value)}
          >
            <span style={{ width: `${value}%` }} />
          </div>
        );
      })}
    </div>
  );
}
