import type { Item } from "../lib/data";

type StoryContentProps = { item: Item };

export function StoryContent({ item }: Readonly<StoryContentProps>) {
  return (
    <article className="story-content">
      <div className="story-kicker">From Mamma's kitchen</div>
      <div className="story-heading-row">
        <h1>{item.name}</h1>
        <span className="price">€{item.price}</span>
      </div>
      <p className="description">{item.description}</p>
      <div className="ingredients-block">
        <p className="label">Made with</p>
        <p className="ingredients">{item.ingredients}</p>
      </div>
      <div className="story-footer">
        <div>
          <p className="label">Nutrition facts</p>
          <p className="per-serving">Per serving</p>
        </div>
        <div className="nutrition-grid">
          <span>
            <strong>{item.nutrition.calories}</strong> kcal
          </span>
          <span>
            <strong>{item.nutrition.protein}g</strong> protein
          </span>
          <span>
            <strong>{item.nutrition.carbohydrates}g</strong> carbs
          </span>
          <span>
            <strong>{item.nutrition.fat}g</strong> fat
          </span>
        </div>
      </div>
    </article>
  );
}
