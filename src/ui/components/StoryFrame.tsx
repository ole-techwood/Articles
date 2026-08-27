import type { Category, MenuItem } from "@/ui/lib/data";

import { PlaybackTimer } from "./PlaybackTimer";
import { PlaybackToggle } from "./PlaybackToggle";
import { StoryContent } from "./StoryContent";
import { StoryControls } from "./StoryControls";

type StoryFrameProps = {
  category: Category;
  item: MenuItem;
  storyIndex: number;
  elapsed: number;
  playing: boolean;
  atEnd: boolean;
  onToggle: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onTouchStart: () => void;
  onTouchEnd: () => void;
};

export function StoryFrame({ category, item, storyIndex, elapsed, playing, atEnd, onToggle, onPrevious, onNext, onTouchStart, onTouchEnd }: StoryFrameProps) {
  return (
    <section
      className="story-frame"
      aria-label={`${category.name} story ${storyIndex + 1} of ${category.items.length}`}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchEnd}
    >
      <div className="story-topbar">
        <PlaybackTimer storyCount={category.items.length} storyIndex={storyIndex} elapsed={elapsed} />
        <PlaybackToggle playing={playing} atEnd={atEnd} onToggle={onToggle} />
      </div>
      <button className="tap-zone tap-zone-left" type="button" aria-label="Previous story" onClick={onPrevious} />
      <button className="tap-zone tap-zone-right" type="button" aria-label="Next story" onClick={onNext} />
      <StoryContent item={item} />
      <StoryControls storyIndex={storyIndex} storyCount={category.items.length} onPrevious={onPrevious} onNext={onNext} />
    </section>
  );
}