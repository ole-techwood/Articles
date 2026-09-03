import { ChevronLeft, ChevronRight } from "lucide-react";

type StoryControlsProps = {
  storyIndex: number;
  storyCount: number;
  isFirstStory: boolean;
  isLastStory: boolean;
  onPrevious: () => void;
  onNext: () => void;
};

export function StoryControls({
  storyIndex,
  storyCount,
  isFirstStory,
  isLastStory,
  onPrevious,
  onNext,
}: StoryControlsProps) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      onPrevious();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      onNext();
    }
  };

  return (
    <div className="story-controls" aria-label="Story navigation">
      <button
        type="button"
        aria-label="Previous story"
        disabled={isFirstStory}
        onClick={onPrevious}
        onKeyDown={handleKeyDown}
      >
        <ChevronLeft aria-hidden="true" />
      </button>
      <span>
        {storyIndex + 1} / {storyCount}
      </span>
      <button
        type="button"
        aria-label="Next story"
        disabled={isLastStory}
        onClick={onNext}
        onKeyDown={handleKeyDown}
      >
        <ChevronRight aria-hidden="true" />
      </button>
    </div>
  );
}
