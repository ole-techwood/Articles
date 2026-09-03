import { useState } from "react";

import { categories } from "./data";

export function usePlayback() {
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [storyIndex, setStoryIndex] = useState(0);

  const currentCategory = categories[categoryIndex];
  const isFirstStory = categoryIndex === 0 && storyIndex === 0;
  const isLastStory =
    categoryIndex === categories.length - 1 &&
    storyIndex === currentCategory.items.length - 1;

  const selectCategory = (nextCategoryIndex: number) => {
    setCategoryIndex(nextCategoryIndex);
    setStoryIndex(0);
  };

  const navigateToStory = (nextStoryIndex: number) => {
    if (nextStoryIndex < 0) {
      if (categoryIndex === 0) return;
      setCategoryIndex((currentCategoryIndex) => currentCategoryIndex - 1);
      setStoryIndex(categories[categoryIndex - 1].items.length - 1);
      return;
    }

    if (nextStoryIndex >= currentCategory.items.length) {
      if (categoryIndex === categories.length - 1) return;
      setCategoryIndex((currentCategoryIndex) => currentCategoryIndex + 1);
      setStoryIndex(0);
      return;
    }

    setStoryIndex(nextStoryIndex);
  };

  return {
    categoryIndex,
    storyIndex,
    currentCategory,
    currentItem: currentCategory.items[storyIndex],
    isFirstStory,
    isLastStory,
    selectCategory,
    navigateToStory,
  };
}
