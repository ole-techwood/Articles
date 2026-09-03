import type { Category, MenuItem } from "@/ui/lib/data";

import { PlaybackTimer } from "./PlaybackTimer";
import { StoryContent } from "./StoryContent";
import { StoryControls } from "./StoryControls";

type StoryFrameProps = {
  category: Category;
  item: MenuItem;
  storyIndex: number;
  isFirstStory: boolean;
  isLastStory: boolean;
  onPrevious: () => void;
  onNext: () => void;
};

export function StoryFrame({
  category,
  item,
  storyIndex,
  isFirstStory,
  isLastStory,
  onPrevious,
  onNext,
}: StoryFrameProps) {
  return (
    <section
      className="story-frame"
      aria-label={`${category.name} story ${storyIndex + 1} of ${category.items.length}`}
    >
      <div className="story-topbar">
        <PlaybackTimer
          storyCount={category.items.length}
          storyIndex={storyIndex}
        />
      </div>
      <button
        className="tap-zone tap-zone-left"
        type="button"
        aria-label="Previous story"
        disabled={isFirstStory}
        onClick={onPrevious}
      />
      <button
        className="tap-zone tap-zone-right"
        type="button"
        aria-label="Next story"
        disabled={isLastStory}
        onClick={onNext}
      />
      <StoryContent item={item} />
      <StoryControls
        storyIndex={storyIndex}
        storyCount={category.items.length}
        isFirstStory={isFirstStory}
        isLastStory={isLastStory}
        onPrevious={onPrevious}
        onNext={onNext}
      />
    </section>
  );
}
