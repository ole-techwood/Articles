import type { Item } from "../lib/data";
import { PlaybackTimer } from "./PlaybackTimer";
import { PlaybackToggle } from "./PlaybackToggle";
import { StoryContent } from "./StoryContent";
import { StoryControls } from "./StoryControls";

type StoryFrameProps = {
  categoryName: string;
  item: Item;
  storyIndex: number;
  storyCount: number;
  elapsed: number;
  playing: boolean;
  atEnd: boolean;
  onMove: (direction: -1 | 1) => void;
  onReplay: () => void;
  onSetPlaying: (playing: boolean) => void;
  temporaryPause: boolean;
  onSetTemporaryPause: (paused: boolean) => void;
};

export function StoryFrame({
  categoryName,
  item,
  storyIndex,
  storyCount,
  elapsed,
  playing,
  atEnd,
  onMove,
  onReplay,
  onSetPlaying,
  onSetTemporaryPause,
}: Readonly<StoryFrameProps>) {
  const togglePlayback = () => {
    if (!playing && atEnd) {
      onReplay();
      return;
    }
    onSetPlaying(!playing);
  };

  return (
    <section
      className="story-frame"
      aria-label={`${categoryName} story ${storyIndex + 1} of ${storyCount}`}
      onTouchStart={() => onSetTemporaryPause(true)}
      onTouchEnd={() => onSetTemporaryPause(false)}
      onTouchCancel={() => onSetTemporaryPause(false)}
    >
      <PlaybackTimer
        storyIndex={storyIndex}
        storyCount={storyCount}
        elapsed={elapsed}
      />
      <div className="story-topline">
        <span>
          {categoryName} · {String(storyIndex + 1).padStart(2, "0")}
        </span>
        <PlaybackToggle playing={playing} onToggle={togglePlayback} />
      </div>
      <button
        className="story-zone story-zone-left"
        type="button"
        aria-label="Previous story area"
        onClick={() => onMove(-1)}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") onMove(-1);
          if (event.key === "ArrowRight") onMove(1);
        }}
      />
      <button
        className="story-zone story-zone-right"
        type="button"
        aria-label="Next story area"
        onClick={() => onMove(1)}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") onMove(-1);
          if (event.key === "ArrowRight") onMove(1);
        }}
      />
      <StoryContent item={item} />
      <StoryControls
        storyIndex={storyIndex}
        storyCount={storyCount}
        onMove={onMove}
      />
    </section>
  );
}
