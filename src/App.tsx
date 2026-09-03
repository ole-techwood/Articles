import { CategoryNav } from "@/ui/components/CategoryNav";
import { SiteHeader } from "@/ui/components/SiteHeader";
import { StoryFrame } from "@/ui/components/StoryFrame";
import { categories } from "@/ui/lib/data";
import { usePlayback } from "@/ui/lib/usePlayback";

import "./App.css";

function App() {
  const playback = usePlayback();

  return (
    <main className="menu-browser">
      <SiteHeader />
      <CategoryNav
        categories={categories}
        activeIndex={playback.categoryIndex}
        onSelect={playback.selectCategory}
      />
      <StoryFrame
        category={playback.currentCategory}
        item={playback.currentItem}
        storyIndex={playback.storyIndex}
        isFirstStory={playback.isFirstStory}
        isLastStory={playback.isLastStory}
        onPrevious={() => playback.navigateToStory(playback.storyIndex - 1)}
        onNext={() => playback.navigateToStory(playback.storyIndex + 1)}
      />
    </main>
  );
}

export default App;
