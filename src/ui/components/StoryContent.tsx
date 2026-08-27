import type { MenuItem } from "@/ui/lib/data";

type StoryContentProps = {
  item: MenuItem;
};

export function StoryContent({ item }: StoryContentProps) {
  return (
    <article className="story-content">
      <div className="story-kicker">From the wood-fired kitchen</div>
      <h2>{item.name}</h2>
      <p className="story-description">{item.description}</p>
      <p className="ingredients">{item.ingredients}</p>
      <p className="price">€{item.price.toFixed(2)}</p>
      <section className="nutrition" aria-label="Nutrition Facts per serving">
        <p className="nutrition-title">Nutrition Facts <span>per serving</span></p>
        <dl>
          <div><dt>Calories</dt><dd>{item.nutrition.calories} kcal</dd></div>
          <div><dt>Protein</dt><dd>{item.nutrition.protein}g</dd></div>
          <div><dt>Carbs</dt><dd>{item.nutrition.carbohydrates}g</dd></div>
          <div><dt>Fat</dt><dd>{item.nutrition.fat}g</dd></div>
        </dl>
      </section>
    </article>
  );
}