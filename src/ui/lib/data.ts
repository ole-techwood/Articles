export type Nutrition = {
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
};

export type Item = {
  name: string;
  description: string;
  ingredients: string;
  price: number;
  nutrition: Nutrition;
};

export type Category = { name: string; emoji: string; items: Item[] };

const item = (
  name: string,
  description: string,
  ingredients: string,
  price: number,
): Item => ({
  name,
  description,
  ingredients,
  price,
  nutrition: { calories: 720, protein: 28, carbohydrates: 82, fat: 29 },
});

export const categories: Category[] = [
  {
    name: "Pizza",
    emoji: "🍕",
    items: [
      item(
        "Margherita",
        "The simple classic, baked until the crust blisters and the basil perfumes the room.",
        "Tomato, fior di latte, basil",
        12,
      ),
      item(
        "Piccante",
        "A little fire for the table, balanced by sweet tomato and cool mozzarella.",
        "Tomato, spicy salami, mozzarella, chilli honey",
        15,
      ),
      item(
        "Ortolana",
        "Garden vegetables roasted over high heat on a crisp olive-oil crust.",
        "Tomato, courgette, peppers, aubergine, smoked scamorza",
        14,
      ),
    ],
  },
  {
    name: "Antipasti",
    emoji: "🫒",
    items: [
      item(
        "Focaccia al Rosmarino",
        "Warm, dimpled focaccia for tearing and sharing before dinner.",
        "Flour, rosemary, sea salt, olive oil",
        7,
      ),
      item(
        "Burrata e Pomodori",
        "Creamy burrata meets tomatoes at their sunniest.",
        "Burrata, heirloom tomatoes, basil oil",
        11,
      ),
      item(
        "Polpette della Mamma",
        "Mamma’s tender meatballs simmered slowly in tomato sauce.",
        "Beef, pork, tomato, parmesan, parsley",
        10,
      ),
    ],
  },
  {
    name: "Pasta",
    emoji: "🍝",
    items: [
      item(
        "Cacio e Pepe",
        "Silky pecorino and cracked black pepper cling to every strand.",
        "Tonnarelli, pecorino romano, black pepper",
        13,
      ),
      item(
        "Tagliatelle al Ragù",
        "Fresh ribbons carrying a slow-cooked ragù, rich enough to make you quiet.",
        "Tagliatelle, beef ragù, parmesan, soffritto",
        16,
      ),
      item(
        "Pesto Genovese",
        "A green, fragrant bowl made for sunny evenings and second helpings.",
        "Trofie, basil, pine nuts, parmesan, garlic",
        14,
      ),
    ],
  },
  {
    name: "Insalate",
    emoji: "🥗",
    items: [
      item(
        "Panzanella",
        "Old bread gets a second life with ripe tomatoes, herbs, and dressing.",
        "Sourdough, tomato, cucumber, red onion, basil",
        10,
      ),
      item(
        "Rucola e Parmigiano",
        "Peppery rocket, parmesan, and lemon brighten the table.",
        "Rocket, parmesan, lemon, extra virgin olive oil",
        9,
      ),
      item(
        "Caprese",
        "A quiet plate of mozzarella and tomato, finished with basil.",
        "Fior di latte, tomato, basil, olive oil",
        11,
      ),
    ],
  },
  {
    name: "Dolci",
    emoji: "🍰",
    items: [
      item(
        "Tiramisù",
        "Espresso-soaked layers, cloud-soft mascarpone, and cocoa on top.",
        "Mascarpone, coffee, eggs, cocoa, savoiardi",
        8,
      ),
      item(
        "Panna Cotta",
        "Silky cream set gently with bright berry sauce.",
        "Cream, vanilla, sugar, seasonal berries",
        7,
      ),
      item(
        "Affogato",
        "Vanilla gelato drowned in hot espresso.",
        "Vanilla gelato, espresso",
        6,
      ),
    ],
  },
  {
    name: "Drinks",
    emoji: "🍷",
    items: [
      item(
        "House Red",
        "A soft red poured for long conversations around the table.",
        "Sangiovese grapes",
        7,
      ),
      item(
        "Aranciata",
        "Italian orange fizz with a sunny lift.",
        "Blood orange, sparkling water, cane sugar",
        5,
      ),
      item(
        "Espresso",
        "Small, dark, and strong enough to finish dinner with a smile.",
        "Arabica coffee beans",
        3,
      ),
    ],
  },
];
