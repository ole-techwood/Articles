import { useEffect, useRef, useState } from "react";

import { categories } from "./data";

export const STORY_DURATION = 6000;

export function usePlayback() {
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [storyIndex, setStoryIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [playing, setPlaying] = useState(true);
  const touchWasPlaying = useRef(false);
  const elapsedRef = useRef(0);
  const storyIndexRef = useRef(0);

  const currentCategory = categories[categoryIndex];
  const atEnd = storyIndex === currentCategory.items.length - 1 && !playing;

  useEffect(() => {
    elapsedRef.current = elapsed;
    storyIndexRef.current = storyIndex;
  }, [elapsed, storyIndex]);

  useEffect(() => {
    if (!playing) return;

    const timer = window.setInterval(() => {
      const nextElapsed = elapsedRef.current + 100;
      if (nextElapsed < STORY_DURATION) {
        elapsedRef.current = nextElapsed;
        setElapsed(nextElapsed);
        return;
      }

      if (storyIndexRef.current < currentCategory.items.length - 1) {
        const nextStoryIndex = storyIndexRef.current + 1;
        storyIndexRef.current = nextStoryIndex;
        elapsedRef.current = 0;
        setStoryIndex(nextStoryIndex);
        setElapsed(0);
        return;
      }

      elapsedRef.current = STORY_DURATION;
      setElapsed(STORY_DURATION);
      setPlaying(false);
    }, 100);

    return () => window.clearInterval(timer);
  }, [currentCategory.items.length, playing]);

  const selectCategory = (nextCategoryIndex: number) => {
    setCategoryIndex(nextCategoryIndex);
    setStoryIndex(0);
    setElapsed(0);
    setPlaying(true);
  };

  const navigateToStory = (nextStoryIndex: number) => {
    const boundedStoryIndex = Math.max(
      0,
      Math.min(nextStoryIndex, currentCategory.items.length - 1),
    );
    setStoryIndex(boundedStoryIndex);
    setElapsed(0);
    setPlaying(true);
  };

  const togglePlayback = () => {
    if (atEnd) {
      setStoryIndex(0);
      setElapsed(0);
      setPlaying(true);
      return;
    }
    setPlaying((currentPlaying) => !currentPlaying);
  };

  const beginTouchPause = () => {
    touchWasPlaying.current = playing;
    if (playing) setPlaying(false);
  };

  const endTouchPause = () => {
    if (touchWasPlaying.current) setPlaying(true);
    touchWasPlaying.current = false;
  };

  return {
    categoryIndex,
    storyIndex,
    elapsed,
    playing,
    atEnd,
    currentCategory,
    currentItem: currentCategory.items[storyIndex],
    selectCategory,
    navigateToStory,
    togglePlayback,
    beginTouchPause,
    endTouchPause,
  };
}