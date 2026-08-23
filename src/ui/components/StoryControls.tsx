import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

type StoryControlsProps = {
  storyIndex: number;
  storyCount: number;
  onMove: (direction: -1 | 1) => void;
};

export function StoryControls({
  storyIndex,
  storyCount,
  onMove,
}: Readonly<StoryControlsProps>) {
  const atStart = storyIndex === 0;
  const atEnd = storyIndex === storyCount - 1;

  return (
    <div className="story-controls" aria-label="Story navigation">
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label="Previous story"
        disabled={atStart}
        onClick={() => onMove(-1)}
      >
        <ChevronLeft aria-hidden="true" />
      </Button>
      <span>
        {storyIndex + 1} / {storyCount}
      </span>
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label="Next story"
        disabled={atEnd}
        onClick={() => onMove(1)}
      >
        <ChevronRight aria-hidden="true" />
      </Button>
    </div>
  );
}
