import { useEffect, useRef, useState } from "react";
import type { Category } from "./data";

export const duration = 6000;

type Direction = -1 | 1;

export function usePlayback(categories: Category[]) {
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [storyIndex, setStoryIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [temporaryPause, setTemporaryPause] = useState(false);
  const category = categories[categoryIndex];
  const current = category.items[storyIndex];
  const atEnd = storyIndex === category.items.length - 1;
  const elapsedRef = useRef(elapsed);
  const storyIndexRef = useRef(storyIndex);

  useEffect(() => {
    elapsedRef.current = elapsed;
    storyIndexRef.current = storyIndex;
  }, [elapsed, storyIndex]);

  const move = (direction: Direction) => {
    const next = Math.max(
      0,
      Math.min(storyIndex + direction, category.items.length - 1),
    );
    setStoryIndex(next);
    setElapsed(0);
    setPlaying(true);
  };

  useEffect(() => {
    if (!playing || temporaryPause) return;
    const timer = setInterval(() => {
      const nextElapsed = elapsedRef.current + 100;
      if (nextElapsed < duration) {
        elapsedRef.current = nextElapsed;
        setElapsed(nextElapsed);
        return;
      }

      if (storyIndexRef.current >= category.items.length - 1) {
        elapsedRef.current = duration;
        setElapsed(duration);
        setPlaying(false);
        return;
      }

      const next = storyIndexRef.current + 1;
      storyIndexRef.current = next;
      elapsedRef.current = 0;
      setStoryIndex(next);
      setElapsed(0);
    }, 100);
    return () => clearInterval(timer);
  }, [category.items.length, categoryIndex, playing, temporaryPause]);

  const selectCategory = (index: number) => {
    setCategoryIndex(index);
    setStoryIndex(0);
    setElapsed(0);
    setPlaying(true);
  };

  const replay = () => {
    setStoryIndex(0);
    setElapsed(0);
    setPlaying(true);
  };

  return {
    category,
    categoryIndex,
    current,
    elapsed,
    playing,
    storyIndex,
    temporaryPause,
    atEnd,
    move,
    replay,
    selectCategory,
    setTemporaryPause,
    setPlaying,
  };
}
