import type { Category } from "../lib/data";

type CategoryNavProps = {
  categories: Category[];
  categoryIndex: number;
  onSelect: (index: number) => void;
};

export function CategoryNav({
  categories,
  categoryIndex,
  onSelect,
}: Readonly<CategoryNavProps>) {
  return (
    <nav className="category-nav" aria-label="Menu categories">
      {categories.map((entry, index) => (
        <button
          className={`story-circle ${index === categoryIndex ? "is-active" : ""}`}
          key={entry.name}
          type="button"
          aria-label={`View ${entry.name} menu`}
          aria-current={index === categoryIndex ? "page" : undefined}
          onClick={() => onSelect(index)}
        >
          <span className="circle-emoji" aria-hidden="true">
            {entry.emoji}
          </span>
          <span>{entry.name}</span>
        </button>
      ))}
    </nav>
  );
}
