import { test, expect } from "@playwright/test";
import { firefox } from "playwright";

const getLinksFromMenu = async (page) => {
    const mainMenuLinks = await page.$$eval('nav a', links => links.map(link => link.href));
    return mainMenuLinks;
}

test("Main menu links should be validated", async () => {
  const browser = await firefox.launch();
  const page = await browser.newPage();
  await page.goto('https://www.ilry.fi/en/');
  const mainMenuLinks = await getLinksFromMenu(page);
  for (const link of mainMenuLinks) {
    const response = await page.goto(link);
    expect(response.status()).toBe(200);  
    }
  await browser.close();
});
// Select the main menu item and Perform visual regression testing on the main menu
test("Perform visual regression testing on the main menu", async ({ page }) => {
  await page.goto("https://www.ilry.fi/en/");

  // Select the main menu item
  page.click("span.nav-toggle__text");

  // Check that the URL has changed
  await expect(page).toHaveScreenshot({ maxDiffPixels: 100 });
});