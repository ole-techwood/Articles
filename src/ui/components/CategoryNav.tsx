import type { Category } from "@/ui/lib/data";

type CategoryNavProps = {
  categories: Category[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function CategoryNav({
  categories,
  activeIndex,
  onSelect,
}: Readonly<CategoryNavProps>) {
  return (
    <nav className="category-nav" aria-label="Menu Categories">
      {categories.map((category, index) => (
        <button
          className={`story-circle ${index === activeIndex ? "is-active" : ""}`}
          key={category.name}
          type="button"
          aria-label={`View ${category.name} menu`}
          aria-pressed={index === activeIndex}
          onClick={() => onSelect(index)}
        >
          <span className="story-circle-emoji" aria-hidden="true">
            {category.emoji}
          </span>
          <span>{category.name}</span>
        </button>
      ))}
    </nav>
  );
}
