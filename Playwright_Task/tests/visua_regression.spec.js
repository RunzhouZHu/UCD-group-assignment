import { test, expect } from "@playwright/test";
// Select the main menu item and Perform visual regression testing on the main menu

const getLinksFromMenu = async (page) => {
  const mainMenuLinks = await page.$$eval("nav a", (links) =>
    links.map((link) => link.href)
  );
  return mainMenuLinks;
};

test.setTimeout(120_000);
test("Perform visual regression testing on the main menu", async ({ page }) => {
  await page.goto("https://www.ilry.fi/en/");

  // Select the main menu item
  const mainMenuLinks = await getLinksFromMenu(page);

  // Click on each link and take a screenshot of the page
  for (const link of mainMenuLinks) {
    await page.goto(link);
    await expect(page).toHaveScreenshot({
      maxDiffPixels: 100,
    });
  }
});
