import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { Button } from './ui/components/ui/button'
import './App.css'

type Item = { name: string; description: string; ingredients: string; price: number; nutrition: { calories: number; protein: number; carbohydrates: number; fat: number } }
type Category = { name: string; emoji: string; items: Item[] }
const duration = 6000
const item = (name: string, description: string, ingredients: string, price: number): Item => ({ name, description, ingredients, price, nutrition: { calories: 720, protein: 28, carbohydrates: 82, fat: 29 } })
const categories: Category[] = [
  { name: 'Pizza', emoji: '🍕', items: [item('Margherita', 'The simple classic, baked until the crust blisters and the basil perfumes the room.', 'Tomato, fior di latte, basil', 12), item('Piccante', 'A little fire for the table, balanced by sweet tomato and cool mozzarella.', 'Tomato, spicy salami, mozzarella, chilli honey', 15), item('Ortolana', 'Garden vegetables roasted over high heat on a crisp olive-oil crust.', 'Tomato, courgette, peppers, aubergine, smoked scamorza', 14)] },
  { name: 'Antipasti', emoji: '🫒', items: [item('Focaccia al Rosmarino', 'Warm, dimpled focaccia for tearing and sharing before dinner.', 'Flour, rosemary, sea salt, olive oil', 7), item('Burrata e Pomodori', 'Creamy burrata meets tomatoes at their sunniest.', 'Burrata, heirloom tomatoes, basil oil', 11), item('Polpette della Mamma', 'Mamma’s tender meatballs simmered slowly in tomato sauce.', 'Beef, pork, tomato, parmesan, parsley', 10)] },
  { name: 'Pasta', emoji: '🍝', items: [item('Cacio e Pepe', 'Silky pecorino and cracked black pepper cling to every strand.', 'Tonnarelli, pecorino romano, black pepper', 13), item('Tagliatelle al Ragù', 'Fresh ribbons carrying a slow-cooked ragù, rich enough to make you quiet.', 'Tagliatelle, beef ragù, parmesan, soffritto', 16), item('Pesto Genovese', 'A green, fragrant bowl made for sunny evenings and second helpings.', 'Trofie, basil, pine nuts, parmesan, garlic', 14)] },
  { name: 'Insalate', emoji: '🥗', items: [item('Panzanella', 'Old bread gets a second life with ripe tomatoes, herbs, and dressing.', 'Sourdough, tomato, cucumber, red onion, basil', 10), item('Rucola e Parmigiano', 'Peppery rocket, parmesan, and lemon brighten the table.', 'Rocket, parmesan, lemon, extra virgin olive oil', 9), item('Caprese', 'A quiet plate of mozzarella and tomato, finished with basil.', 'Fior di latte, tomato, basil, olive oil', 11)] },
  { name: 'Dolci', emoji: '🍰', items: [item('Tiramisù', 'Espresso-soaked layers, cloud-soft mascarpone, and cocoa on top.', 'Mascarpone, coffee, eggs, cocoa, savoiardi', 8), item('Panna Cotta', 'Silky cream set gently with bright berry sauce.', 'Cream, vanilla, sugar, seasonal berries', 7), item('Affogato', 'Vanilla gelato drowned in hot espresso.', 'Vanilla gelato, espresso', 6)] },
  { name: 'Drinks', emoji: '🍷', items: [item('House Red', 'A soft red poured for long conversations around the table.', 'Sangiovese grapes', 7), item('Aranciata', 'Italian orange fizz with a sunny lift.', 'Blood orange, sparkling water, cane sugar', 5), item('Espresso', 'Small, dark, and strong enough to finish dinner with a smile.', 'Arabica coffee beans', 3)] },
]

function App() {
  const [categoryIndex, setCategoryIndex] = useState(0)
  const [storyIndex, setStoryIndex] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [temporaryPause, setTemporaryPause] = useState(false)
  const category = categories[categoryIndex]
  const current = category.items[storyIndex]
  const atEnd = storyIndex === category.items.length - 1
  const move = (direction: -1 | 1) => { setStoryIndex((value) => { const next = Math.max(0, Math.min(value + direction, category.items.length - 1)); if (next === category.items.length - 1) setPlaying(false); return next }); setElapsed(0) }

  useEffect(() => {
    if (!playing || temporaryPause || atEnd) return
    const timer = window.setInterval(() => setElapsed((value) => {
      if (value + 100 >= duration) { setStoryIndex((value) => { const next = Math.min(value + 1, category.items.length - 1); if (next === category.items.length - 1) setPlaying(false); return next }); return 0 }
      return value + 100
    }), 100)
    return () => window.clearInterval(timer)
  }, [atEnd, category.items.length, playing, temporaryPause])

  const selectCategory = (index: number) => { setCategoryIndex(index); setStoryIndex(0); setElapsed(0); setPlaying(true) }
  return (
    <main className="menu-browser">
      <header className="site-header"><p className="eyebrow">An evening at</p><p className="wordmark">Mamma Pizza<span>!</span></p><p className="header-note">Family recipes · Since always</p></header>
      <nav className="category-nav" aria-label="Menu categories">
        {categories.map((entry, index) => <button className={`story-circle ${index === categoryIndex ? 'is-active' : ''}`} key={entry.name} type="button" aria-label={`View ${entry.name} menu`} aria-current={index === categoryIndex ? 'page' : undefined} onClick={() => selectCategory(index)}><span className="circle-emoji" aria-hidden="true">{entry.emoji}</span><span>{entry.name}</span></button>)}
      </nav>
      <section className="story-frame" aria-label={`${category.name} story ${storyIndex + 1} of ${category.items.length}`} tabIndex={0} onMouseEnter={() => setTemporaryPause(true)} onMouseLeave={() => setTemporaryPause(false)} onFocusCapture={() => setTemporaryPause(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setTemporaryPause(false) }} onTouchStart={() => setTemporaryPause(true)} onTouchEnd={() => setTemporaryPause(false)} onTouchCancel={() => setTemporaryPause(false)} onKeyDown={(event) => { if (event.key === 'ArrowRight') move(1); if (event.key === 'ArrowLeft') move(-1) }}>
        <div className="timer" role="progressbar" aria-label={`${storyIndex + 1} of ${category.items.length} stories shown`} aria-valuemin={0} aria-valuemax={duration} aria-valuenow={elapsed}>{category.items.map((entry, index) => <span className="timer-track" key={entry.name}><span className="timer-fill" style={{ width: index < storyIndex ? '100%' : index === storyIndex ? `${elapsed / duration * 100}%` : '0%' }} /></span>)}</div>
        <div className="story-topline"><span>{category.name} · {String(storyIndex + 1).padStart(2, '0')}</span><Button className="playback-control" variant="outline" size="icon" type="button" aria-label={playing ? 'Pause story playback' : 'Play story playback'} aria-pressed={!playing} onClick={() => { if (!playing && atEnd) { setStoryIndex(0); setElapsed(0); setPlaying(true) } else setPlaying((value) => !value) }}>{playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}</Button></div>
        <button className="story-zone story-zone-left" type="button" aria-label="Previous story area" onClick={() => move(-1)} /><button className="story-zone story-zone-right" type="button" aria-label="Next story area" onClick={() => move(1)} />
        <article className="story-content"><div className="story-kicker">From Mamma's kitchen</div><div className="story-heading-row"><h1>{current.name}</h1><span className="price">€{current.price}</span></div><p className="description">{current.description}</p><div className="ingredients-block"><p className="label">Made with</p><p className="ingredients">{current.ingredients}</p></div><div className="story-footer"><div><p className="label">Nutrition facts</p><p className="per-serving">Per serving</p></div><div className="nutrition-grid"><span><strong>{current.nutrition.calories}</strong> kcal</span><span><strong>{current.nutrition.protein}g</strong> protein</span><span><strong>{current.nutrition.carbohydrates}g</strong> carbs</span><span><strong>{current.nutrition.fat}g</strong> fat</span></div></div></article>
        <div className="story-controls" aria-label="Story navigation"><Button type="button" variant="outline" size="icon" aria-label="Previous story" disabled={storyIndex === 0} onClick={() => move(-1)}><ChevronLeft aria-hidden="true" /></Button><span>{storyIndex + 1} / {category.items.length}</span><Button type="button" variant="outline" size="icon" aria-label="Next story" disabled={atEnd} onClick={() => move(1)}><ChevronRight aria-hidden="true" /></Button></div>
      </section><p className="footer-note">Take your time. There is always room for one more.</p>
    </main>
  )
}
export default App