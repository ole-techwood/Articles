export type Nutrition = {
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
};

export type MenuItem = {
  name: string;
  description: string;
  ingredients: string;
  price: number;
  nutrition: Nutrition;
};

export type Category = {
  name: string;
  emoji: string;
  items: MenuItem[];
};

const item = (
  name: string,
  description: string,
  ingredients: string,
  price: number,
  nutrition: Nutrition,
): MenuItem => ({ name, description, ingredients, price, nutrition });

export const categories: Category[] = [
  {
    name: "Pizza",
    emoji: "🍕",
    items: [
      item("Margherita", "The simple classic, baked until the crust blisters and the basil perfumes the room.", "Tomato, fior di latte, basil", 12, { calories: 720, protein: 28, carbohydrates: 82, fat: 29 }),
      item("Piccante", "A little fire for the table, balanced by sweet tomato and cool mozzarella.", "Tomato, spicy salami, mozzarella, chilli honey", 15, { calories: 880, protein: 37, carbohydrates: 79, fat: 45 }),
      item("Ortolana", "Garden vegetables roasted over high heat on a crisp olive-oil crust.", "Tomato, courgette, peppers, aubergine, smoked scamorza", 14, { calories: 690, protein: 25, carbohydrates: 84, fat: 25 }),
    ],
  },
  {
    name: "Antipasti",
    emoji: "🫒",
    items: [
      item("Focaccia al Rosmarino", "Warm, dimpled focaccia for tearing and sharing before dinner.", "Flour, rosemary, sea salt, olive oil", 7, { calories: 310, protein: 9, carbohydrates: 43, fat: 12 }),
      item("Burrata e Pomodori", "Creamy burrata meets tomatoes at their sunniest.", "Burrata, heirloom tomatoes, basil oil", 11, { calories: 410, protein: 19, carbohydrates: 17, fat: 29 }),
      item("Polpette della Mamma", "Mamma's tender meatballs simmered slowly in tomato sauce.", "Beef, pork, tomato, parmesan, parsley", 10, { calories: 520, protein: 31, carbohydrates: 24, fat: 31 }),
    ],
  },
  {
    name: "Pasta",
    emoji: "🍝",
    items: [
      item("Cacio e Pepe", "Silky pecorino and cracked black pepper cling to every strand.", "Tonnarelli, pecorino romano, black pepper", 13, { calories: 640, protein: 24, carbohydrates: 76, fat: 26 }),
      item("Tagliatelle al Ragù", "Fresh ribbons carrying a slow-cooked ragù, rich enough to make you quiet.", "Tagliatelle, beef ragù, parmesan, soffritto", 16, { calories: 780, protein: 39, carbohydrates: 88, fat: 29 }),
      item("Pesto Genovese", "A green, fragrant bowl made for sunny evenings and second helpings.", "Trofie, basil, pine nuts, parmesan, garlic", 14, { calories: 610, protein: 18, carbohydrates: 81, fat: 24 }),
    ],
  },
  {
    name: "Insalate",
    emoji: "🥗",
    items: [
      item("Panzanella", "Old bread gets a second life with ripe tomatoes, herbs, and dressing.", "Sourdough, tomato, cucumber, red onion, basil", 10, { calories: 350, protein: 10, carbohydrates: 52, fat: 11 }),
      item("Rucola e Parmigiano", "Peppery rocket, parmesan, and lemon brighten the table.", "Rocket, parmesan, lemon, extra virgin olive oil", 9, { calories: 190, protein: 5, carbohydrates: 16, fat: 12 }),
      item("Caprese", "A quiet plate of mozzarella and tomato, finished with basil.", "Fior di latte, tomato, basil, olive oil", 11, { calories: 380, protein: 21, carbohydrates: 14, fat: 27 }),
    ],
  },
  {
    name: "Dolci",
    emoji: "🍰",
    items: [
      item("Tiramisù", "Espresso-soaked layers, cloud-soft mascarpone, and cocoa on top.", "Mascarpone, coffee, eggs, cocoa, savoiardi", 8, { calories: 470, protein: 8, carbohydrates: 46, fat: 28 }),
      item("Panna Cotta", "Silky cream set gently with bright berry sauce.", "Cream, vanilla, sugar, seasonal berries", 7, { calories: 330, protein: 5, carbohydrates: 30, fat: 21 }),
      item("Affogato", "Vanilla gelato drowned in hot espresso.", "Vanilla gelato, espresso", 6, { calories: 240, protein: 6, carbohydrates: 28, fat: 11 }),
    ],
  },
  {
    name: "Drinks",
    emoji: "🍷",
    items: [
      item("House Red", "A soft red poured for long conversations around the table.", "Sangiovese grapes", 7, { calories: 125, protein: 0, carbohydrates: 4, fat: 0 }),
      item("Aranciata", "Italian orange fizz with a sunny lift.", "Blood orange, sparkling water, cane sugar", 5, { calories: 140, protein: 0, carbohydrates: 35, fat: 0 }),
      item("Espresso", "Small, dark, and strong enough to finish dinner with a smile.", "Arabica coffee beans", 3, { calories: 25, protein: 1, carbohydrates: 2, fat: 1 }),
    ],
  },
];