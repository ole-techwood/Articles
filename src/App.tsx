import "./App.css";
import { CategoryNav } from "./ui/components/CategoryNav";
import { SiteHeader } from "./ui/components/SiteHeader";
import { StoryFrame } from "./ui/components/StoryFrame";
import { categories } from "./ui/lib/data";
import { usePlayback } from "./ui/lib/usePlayback";

function App() {
  const playback = usePlayback(categories);

  return (
    <main className="menu-browser">
      <SiteHeader />
      <CategoryNav
        categories={categories}
        categoryIndex={playback.categoryIndex}
        onSelect={playback.selectCategory}
      />
      <StoryFrame
        categoryName={playback.category.name}
        item={playback.current}
        storyIndex={playback.storyIndex}
        storyCount={playback.category.items.length}
        elapsed={playback.elapsed}
        playing={playback.playing}
        atEnd={playback.atEnd}
        onMove={playback.move}
        onReplay={playback.replay}
        onSetPlaying={playback.setPlaying}
        temporaryPause={playback.temporaryPause}
        onSetTemporaryPause={playback.setTemporaryPause}
      />
    </main>
  );
}

export default App;
