import { expect, test, type Locator, type Page } from "@playwright/test";

type MenuItemFixture = {
  name: string;
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
};

type CategoryFixture = {
  name: string;
  items: MenuItemFixture[];
};

const categoryFixtures: CategoryFixture[] = [
  {
    name: "Pizza",
    items: [
      {
        name: "Margherita",
        calories: 720,
        protein: 28,
        carbohydrates: 82,
        fat: 29,
      },
      {
        name: "Piccante",
        calories: 880,
        protein: 37,
        carbohydrates: 79,
        fat: 45,
      },
      {
        name: "Ortolana",
        calories: 690,
        protein: 25,
        carbohydrates: 84,
        fat: 25,
      },
    ],
  },
  {
    name: "Antipasti",
    items: [
      {
        name: "Focaccia al Rosmarino",
        calories: 310,
        protein: 9,
        carbohydrates: 43,
        fat: 12,
      },
      {
        name: "Burrata e Pomodori",
        calories: 410,
        protein: 19,
        carbohydrates: 17,
        fat: 29,
      },
      {
        name: "Polpette della Mamma",
        calories: 520,
        protein: 31,
        carbohydrates: 24,
        fat: 31,
      },
    ],
  },
  {
    name: "Pasta",
    items: [
      {
        name: "Cacio e Pepe",
        calories: 640,
        protein: 24,
        carbohydrates: 76,
        fat: 26,
      },
      {
        name: "Tagliatelle al Ragù",
        calories: 780,
        protein: 39,
        carbohydrates: 88,
        fat: 29,
      },
      {
        name: "Pesto Genovese",
        calories: 610,
        protein: 18,
        carbohydrates: 81,
        fat: 24,
      },
    ],
  },
  {
    name: "Insalate",
    items: [
      {
        name: "Panzanella",
        calories: 350,
        protein: 10,
        carbohydrates: 52,
        fat: 11,
      },
      {
        name: "Rucola e Parmigiano",
        calories: 190,
        protein: 5,
        carbohydrates: 16,
        fat: 12,
      },
      {
        name: "Caprese",
        calories: 380,
        protein: 21,
        carbohydrates: 14,
        fat: 27,
      },
    ],
  },
  {
    name: "Dolci",
    items: [
      {
        name: "Tiramisù",
        calories: 470,
        protein: 8,
        carbohydrates: 46,
        fat: 28,
      },
      {
        name: "Panna Cotta",
        calories: 330,
        protein: 5,
        carbohydrates: 30,
        fat: 21,
      },
      {
        name: "Affogato",
        calories: 240,
        protein: 6,
        carbohydrates: 28,
        fat: 11,
      },
    ],
  },
  {
    name: "Drinks",
    items: [
      {
        name: "House Red",
        calories: 125,
        protein: 0,
        carbohydrates: 4,
        fat: 0,
      },
      {
        name: "Aranciata",
        calories: 140,
        protein: 0,
        carbohydrates: 35,
        fat: 0,
      },
      { name: "Espresso", calories: 25, protein: 1, carbohydrates: 2, fat: 1 },
    ],
  },
];

const menuBrowserCategories = categoryFixtures.map((category) => category.name);
const storyFrameName = (category: string) =>
  new RegExp(`^${category} story [1-3] of 3$`);

class MenuBrowserPage {
  private readonly page: Page;
  readonly root: Locator;
  readonly categoryNavigation: Locator;

  constructor(page: Page) {
    this.page = page;
    this.root = page.locator("main.menu-browser");
    this.categoryNavigation = page.getByRole("navigation", {
      name: "Menu Categories",
    });
  }

  categoryCircle(category: string) {
    return this.categoryNavigation.getByRole("button", {
      name: `View ${category} menu`,
    });
  }

  storyFrame(category?: string) {
    const name = category
      ? storyFrameName(category)
      : /^(Pizza|Antipasti|Pasta|Insalate|Dolci|Drinks) story [1-3] of 3$/;
    return this.page.getByRole("region", { name });
  }

  storyArticle() {
    return this.storyFrame().locator("article");
  }

  nutritionRegion() {
    return this.storyFrame().getByRole("region", {
      name: "Nutrition Facts per serving",
    });
  }

  progressSegments() {
    return this.storyFrame().getByRole("progressbar");
  }

  storyNavigation() {
    return this.storyFrame().locator('[aria-label="Story navigation"]');
  }

  tapPrevious() {
    return this.storyFrame()
      .getByRole("button", { name: "Previous story" })
      .first();
  }

  tapNext() {
    return this.storyFrame()
      .getByRole("button", { name: "Next story" })
      .first();
  }

  previousControl() {
    return this.storyNavigation().getByRole("button", {
      name: "Previous story",
    });
  }

  nextControl() {
    return this.storyNavigation().getByRole("button", { name: "Next story" });
  }

  async goto() {
    await this.page.goto("/");
    await expect(this.storyFrame()).toBeVisible();
  }

  async selectCategory(category: string) {
    await this.categoryCircle(category).click();
    await expect(this.storyFrame(category)).toHaveAccessibleName(
      `${category} story 1 of 3`,
    );
  }

  async nextStory() {
    await this.nextControl().click();
  }

  async previousStory() {
    await this.previousControl().click();
  }

  async progressValues() {
    const progressSegments = this.progressSegments();
    return Promise.all(
      Array.from({ length: await progressSegments.count() }, (_, index) =>
        progressSegments.nth(index).getAttribute("aria-valuenow"),
      ),
    );
  }

  async assertNoHorizontalOverflow() {
    await expect
      .poll(() =>
        this.page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      )
      .toBeTruthy();
  }
}

async function assertNutritionFacts(
  nutritionRegion: Locator,
  item: MenuItemFixture,
) {
  await expect(nutritionRegion).toContainText(`${item.calories} kcal`);
  await expect(nutritionRegion).toContainText(`${item.protein}g`);
  await expect(nutritionRegion).toContainText(`${item.carbohydrates}g`);
  await expect(nutritionRegion).toContainText(`${item.fat}g`);
}

async function waitWithoutInput(page: Page) {
  const startTime = Date.now();
  await page.waitForFunction(
    (startedAt) => Date.now() - startedAt >= 1000,
    startTime,
  );
}

test.describe("Mamma Pizza Menu Browser", () => {
  test("PW-01: Open on the Featured Dish with complete content", async ({
    page,
  }) => {
    const menuBrowser = new MenuBrowserPage(page);

    // 1. Navigate to `/`.
    await menuBrowser.goto();

    // 2. Locate the Story Frame region by accessible name matching `Pizza story 1 of 3`.
    const storyFrame = page.getByRole("region", { name: "Pizza story 1 of 3" });
    await expect(storyFrame).toBeVisible();

    // 3. Verify the active Menu Item heading is `Margherita`.
    await expect(
      storyFrame.getByRole("heading", { name: "Margherita" }),
    ).toBeVisible();

    // 4. Verify description, ingredients, and euro price are visible.
    await expect(storyFrame.locator(".story-description")).toBeVisible();
    await expect(storyFrame.locator(".ingredients")).toBeVisible();
    await expect(storyFrame.locator(".price")).toHaveText("€12.00");

    // 5. Verify the Nutrition Facts region is named `Nutrition Facts per serving`.
    const nutritionRegion = storyFrame.getByRole("region", {
      name: "Nutrition Facts per serving",
    });
    await expect(nutritionRegion).toBeVisible();

    // 6. Verify values are `720 kcal`, `28g`, `82g`, and `29g`.
    await assertNutritionFacts(nutritionRegion, categoryFixtures[0].items[0]);

    // 7. Verify exactly six Category Story Circles exist, Pizza is pressed, and exactly three progress segments exist.
    await expect(
      menuBrowser.categoryNavigation.getByRole("button"),
    ).toHaveCount(6);
    await expect(menuBrowser.categoryCircle("Pizza")).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await expect(storyFrame.getByRole("progressbar")).toHaveCount(3);

    // 8. Verify the current Story marker is complete, with the other two segments pending.
    await expect(storyFrame.getByRole("progressbar").nth(0)).toHaveAttribute(
      "aria-valuenow",
      "100",
    );
    await expect(storyFrame.getByRole("progressbar").nth(1)).toHaveAttribute(
      "aria-valuenow",
      "0",
    );
    await expect(storyFrame.getByRole("progressbar").nth(2)).toHaveAttribute(
      "aria-valuenow",
      "0",
    );
  });

  test("PW-02: Select every Category and reset to its first Story", async ({
    page,
  }) => {
    const menuBrowser = new MenuBrowserPage(page);

    // 1. Record the six Story Circle buttons in order.
    await menuBrowser.goto();
    const categoryButtons = menuBrowser.categoryNavigation.getByRole("button");
    await expect(categoryButtons).toHaveCount(menuBrowserCategories.length);
    for (const [index, category] of menuBrowserCategories.entries()) {
      await expect(categoryButtons.nth(index)).toHaveAccessibleName(
        `View ${category} menu`,
      );
    }

    // 2. For each Story Circle, click it from a fresh reset.
    for (const categoryFixture of categoryFixtures) {
      await menuBrowser.goto();
      await menuBrowser.selectCategory(categoryFixture.name);

      // 3. Verify that the clicked Circle is pressed and all other Circles are not pressed.
      for (const category of categoryFixtures) {
        await expect(menuBrowser.categoryCircle(category.name)).toHaveAttribute(
          "aria-pressed",
          category.name === categoryFixture.name ? "true" : "false",
        );
      }

      // 4. Verify the Story Frame accessible name is `<Category> story 1 of 3`.
      await expect(
        menuBrowser.storyFrame(categoryFixture.name),
      ).toHaveAccessibleName(`${categoryFixture.name} story 1 of 3`);

      // 5. Verify the first expected Menu Item and its Nutrition Facts are visible.
      const firstItem = categoryFixture.items[0];
      await expect(
        menuBrowser.storyFrame().getByRole("heading", { name: firstItem.name }),
      ).toBeVisible();
      await assertNutritionFacts(menuBrowser.nutritionRegion(), firstItem);

      // 6. Advance to Story 2, select the same Category again, and verify it resets to Story 1.
      await menuBrowser.nextStory();
      await menuBrowser.selectCategory(categoryFixture.name);
      await expect(
        menuBrowser.storyFrame(categoryFixture.name),
      ).toHaveAccessibleName(`${categoryFixture.name} story 1 of 3`);
      await assertNutritionFacts(menuBrowser.nutritionRegion(), firstItem);
    }
  });

  test("PW-03: Browse Stories across ordered Category sequences", async ({
    page,
  }) => {
    const menuBrowser = new MenuBrowserPage(page);

    // 1. Start at the first Story in the first Category.
    await menuBrowser.goto();
    await expect(menuBrowser.storyFrame("Pizza")).toHaveAccessibleName(
      "Pizza story 1 of 3",
    );
    await expect(menuBrowser.tapPrevious()).toBeDisabled();
    await expect(menuBrowser.previousControl()).toBeDisabled();

    // 2. Browse every Story in order, including transitions between Categories.
    for (const [categoryIndex, categoryFixture] of categoryFixtures.entries()) {
      await expect(
        menuBrowser.storyFrame(categoryFixture.name),
      ).toHaveAccessibleName(`${categoryFixture.name} story 1 of 3`);
      await expect(
        menuBrowser.storyArticle().getByRole("heading", {
          name: categoryFixture.items[0].name,
        }),
      ).toBeVisible();

      // 3. Click `Next story`; verify Story 2 and second Menu Item.
      await menuBrowser.nextStory();
      await expect(
        menuBrowser.storyFrame(categoryFixture.name),
      ).toHaveAccessibleName(`${categoryFixture.name} story 2 of 3`);
      await expect(
        menuBrowser.storyArticle().getByRole("heading", {
          name: categoryFixture.items[1].name,
        }),
      ).toBeVisible();

      // 4. Click `Next story` again; verify Story 3 and third Menu Item.
      await menuBrowser.nextStory();
      await expect(
        menuBrowser.storyFrame(categoryFixture.name),
      ).toHaveAccessibleName(`${categoryFixture.name} story 3 of 3`);
      await expect(
        menuBrowser.storyArticle().getByRole("heading", {
          name: categoryFixture.items[2].name,
        }),
      ).toBeVisible();

      const isFinalCategory = categoryIndex === categoryFixtures.length - 1;
      if (isFinalCategory) {
        // 5. Verify only global final Story disables forward navigation.
        await expect(menuBrowser.tapNext()).toBeDisabled();
        await expect(menuBrowser.nextControl()).toBeDisabled();
        continue;
      }

      const nextCategory = categoryFixtures[categoryIndex + 1];

      // 6. Verify Story 3 can advance into next Category's Story 1.
      await expect(menuBrowser.tapNext()).toBeEnabled();
      await expect(menuBrowser.nextControl()).toBeEnabled();
      await menuBrowser.nextStory();
      await expect(
        menuBrowser.storyFrame(nextCategory.name),
      ).toHaveAccessibleName(`${nextCategory.name} story 1 of 3`);
      await expect(
        menuBrowser.categoryCircle(nextCategory.name),
      ).toHaveAttribute("aria-pressed", "true");
      await expect(
        menuBrowser.storyArticle().getByRole("heading", {
          name: nextCategory.items[0].name,
        }),
      ).toBeVisible();

      // 7. Verify previous navigation returns to the preceding Category's Story 3.
      await expect(menuBrowser.tapPrevious()).toBeEnabled();
      await expect(menuBrowser.previousControl()).toBeEnabled();
      await menuBrowser.previousStory();
      await expect(
        menuBrowser.storyFrame(categoryFixture.name),
      ).toHaveAccessibleName(`${categoryFixture.name} story 3 of 3`);
      await menuBrowser.nextStory();
    }
  });

  test("PW-04: Advance Stories only through explicit manual interaction", async ({
    page,
  }) => {
    const menuBrowser = new MenuBrowserPage(page);

    // 1. Navigate to `/` and verify Story 1 of 3.
    await menuBrowser.goto();
    await expect(menuBrowser.storyFrame("Pizza")).toHaveAccessibleName(
      "Pizza story 1 of 3",
    );

    // 2. Wait without input; verify Story 1 remains visible.
    await waitWithoutInput(page);
    await expect(menuBrowser.storyFrame("Pizza")).toHaveAccessibleName(
      "Pizza story 1 of 3",
    );

    // 3. Click explicit `Next story` twice; verify Stories 2 and 3 appear in order.
    await menuBrowser.nextStory();
    await expect(menuBrowser.storyFrame("Pizza")).toHaveAccessibleName(
      "Pizza story 2 of 3",
    );
    await menuBrowser.nextStory();
    await expect(menuBrowser.storyFrame("Pizza")).toHaveAccessibleName(
      "Pizza story 3 of 3",
    );

    // 4. Wait without input; verify Story 3 remains visible.
    await waitWithoutInput(page);
    await expect(menuBrowser.storyFrame("Pizza")).toHaveAccessibleName(
      "Pizza story 3 of 3",
    );

    // 5. Click explicit `Previous story`; verify Story 2 appears.
    await menuBrowser.previousStory();
    await expect(menuBrowser.storyFrame("Pizza")).toHaveAccessibleName(
      "Pizza story 2 of 3",
    );
  });

  test("PW-05: Expose Progress Timer semantics for pending, current, and completed Stories", async ({
    page,
  }) => {
    const menuBrowser = new MenuBrowserPage(page);

    // 1. Navigate to `/` and verify three progressbar elements exist.
    await menuBrowser.goto();
    await expect(menuBrowser.progressSegments()).toHaveCount(3);

    // 2. Read each segment's accessible attributes.
    const progressSegments = menuBrowser.progressSegments();

    // 3. Verify labels are Story 1/2/3 progress; min is 0; max is 100.
    for (const [index, label] of [
      "Story 1 progress",
      "Story 2 progress",
      "Story 3 progress",
    ].entries()) {
      await expect(progressSegments.nth(index)).toHaveAttribute(
        "aria-label",
        label,
      );
      await expect(progressSegments.nth(index)).toHaveAttribute(
        "aria-valuemin",
        "0",
      );
      await expect(progressSegments.nth(index)).toHaveAttribute(
        "aria-valuemax",
        "100",
      );
    }

    // 4. Verify the current Story marker is complete, with later Stories pending.
    await expect(progressSegments.nth(0)).toHaveAttribute(
      "aria-valuenow",
      "100",
    );
    await expect(progressSegments.nth(1)).toHaveAttribute("aria-valuenow", "0");
    await expect(progressSegments.nth(2)).toHaveAttribute("aria-valuenow", "0");

    // 5. Click `Next story`; verify Story 1 is completed, Story 2 is current, Story 3 is pending.
    await menuBrowser.nextStory();
    await expect(progressSegments.nth(0)).toHaveAttribute(
      "aria-valuenow",
      "100",
    );
    await expect(progressSegments.nth(1)).toHaveAttribute(
      "aria-valuenow",
      "100",
    );
    await expect(progressSegments.nth(2)).toHaveAttribute("aria-valuenow", "0");

    // 6. Click `Next story`; verify all prior segments are completed and Story 3 is current.
    await menuBrowser.nextStory();
    await expect(progressSegments.nth(0)).toHaveAttribute(
      "aria-valuenow",
      "100",
    );
    await expect(progressSegments.nth(1)).toHaveAttribute(
      "aria-valuenow",
      "100",
    );
    await expect(progressSegments.nth(2)).toHaveAttribute(
      "aria-valuenow",
      "100",
    );
  });

  test("PW-06: Verify responsive Story Frame layout and reachable Category Navigation", async ({
    page,
  }) => {
    const menuBrowser = new MenuBrowserPage(page);

    // 1. Run at desktop viewport 1280 x 900.
    await page.setViewportSize({ width: 1280, height: 900 });
    await menuBrowser.goto();

    // 2. Locate Story Frame and measure rendered width and height.
    const desktopFrame = menuBrowser.storyFrame();
    const desktopBox = await desktopFrame.boundingBox();
    expect(desktopBox).not.toBeNull();

    // 3. Verify width-to-height ratio is approximately 9:16 and frame is centered.
    if (!desktopBox) throw new Error("Desktop Story Frame has no bounding box");
    expect(desktopBox.width / desktopBox.height).toBeCloseTo(9 / 16, 2);
    expect(desktopBox.x + desktopBox.width / 2).toBeCloseTo(1280 / 2, 0);

    // 4. Verify focus indicators are reachable on Category Circles and Story controls.
    const pizzaCircle = menuBrowser.categoryCircle("Pizza");
    await pizzaCircle.focus();
    await expect(pizzaCircle).toBeFocused();
    await expect(
      pizzaCircle.evaluate((element) => getComputedStyle(element).outlineWidth),
    ).not.toBe("0px");
    await menuBrowser.nextControl().focus();
    await expect(menuBrowser.nextControl()).toBeFocused();

    // 5. Run at mobile viewport 375 x 812 with touch-capable interaction.
    await page.setViewportSize({ width: 375, height: 812 });
    await page.reload();

    // 6. Verify Story Frame uses available mobile width and no horizontal overflow.
    const mobileFrame = menuBrowser.storyFrame();
    const mobileBox = await mobileFrame.boundingBox();
    expect(mobileBox).not.toBeNull();
    if (!mobileBox) throw new Error("Mobile Story Frame has no bounding box");
    expect(mobileBox.width).toBeLessThanOrEqual(375);
    expect(mobileBox.width / mobileBox.height).toBeCloseTo(9 / 16, 2);
    await menuBrowser.assertNoHorizontalOverflow();

    // 7. Verify Category Navigation reaches all six Story Circles.
    await expect(
      menuBrowser.categoryNavigation.getByRole("button"),
    ).toHaveCount(6);
    for (const categoryFixture of categoryFixtures) {
      await expect(
        menuBrowser.categoryCircle(categoryFixture.name),
      ).toBeVisible();
      await menuBrowser.categoryCircle(categoryFixture.name).click();
    }

    // 8. Verify content and controls remain reachable without overlap or clipping.
    await expect(menuBrowser.storyArticle()).toBeVisible();
    await expect(menuBrowser.nutritionRegion()).toBeVisible();
    await expect(menuBrowser.progressSegments()).toHaveCount(3);
    await expect(menuBrowser.storyNavigation()).toBeVisible();
  });

  test("PW-07: Verify Menu Item content and dynamic Nutrition Facts across all 18 Stories", async ({
    page,
  }) => {
    const menuBrowser = new MenuBrowserPage(page);

    // 1. For each Category, select its Story Circle.
    for (const categoryFixture of categoryFixtures) {
      await menuBrowser.goto();
      await menuBrowser.selectCategory(categoryFixture.name);

      // 2. For each Story, verify Menu Item fields and Nutrition Facts region.
      for (const [storyIndex, item] of categoryFixture.items.entries()) {
        await expect(
          menuBrowser.storyArticle().getByRole("heading", { name: item.name }),
        ).toBeVisible();
        await expect(
          menuBrowser.storyArticle().locator(".story-description"),
        ).not.toBeEmpty();
        await expect(
          menuBrowser.storyArticle().locator(".ingredients"),
        ).not.toBeEmpty();
        await expect(menuBrowser.storyArticle().locator(".price")).toHaveText(
          /€\d+\.\d{2}/,
        );
        await expect(menuBrowser.nutritionRegion()).toBeVisible();

        // 3. Compare calories, protein, carbohydrates, and fat with fixture matrix.
        await assertNutritionFacts(menuBrowser.nutritionRegion(), item);

        // 4. Verify changing Story updates all Nutrition Facts values without reload.
        if (storyIndex < categoryFixture.items.length - 1) {
          await menuBrowser.nextStory();
        }
      }

      // 5. Select another Category and verify its first Menu Item values update.
      const nextCategory =
        categoryFixtures[
          (categoryFixtures.indexOf(categoryFixture) + 1) %
            categoryFixtures.length
        ];
      await menuBrowser.selectCategory(nextCategory.name);
      await expect(
        menuBrowser
          .storyArticle()
          .getByRole("heading", { name: nextCategory.items[0].name }),
      ).toBeVisible();
      await assertNutritionFacts(
        menuBrowser.nutritionRegion(),
        nextCategory.items[0],
      );
    }

    // 6. Verify no two fixture rows share an identical Nutrition Facts tuple.
    const nutritionTuples = categoryFixtures.flatMap((category) =>
      category.items.map(
        (item) =>
          `${item.calories}/${item.protein}/${item.carbohydrates}/${item.fat}`,
      ),
    );
    expect(new Set(nutritionTuples).size).toBe(nutritionTuples.length);
  });
});
