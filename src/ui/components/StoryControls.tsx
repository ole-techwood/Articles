import { ChevronLeft, ChevronRight } from "lucide-react";

type StoryControlsProps = {
  storyIndex: number;
  storyCount: number;
  onPrevious: () => void;
  onNext: () => void;
};

export function StoryControls({ storyIndex, storyCount, onPrevious, onNext }: StoryControlsProps) {
  return (
    <div className="story-controls" aria-label="Story navigation">
      <button type="button" aria-label="Previous story" disabled={storyIndex === 0} onClick={onPrevious}>
        <ChevronLeft aria-hidden="true" />
      </button>
      <span>{storyIndex + 1} / {storyCount}</span>
      <button type="button" aria-label="Next story" disabled={storyIndex === storyCount - 1} onClick={onNext}>
        <ChevronRight aria-hidden="true" />
      </button>
    </div>
  );
}