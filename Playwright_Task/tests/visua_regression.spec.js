import { test, expect } from "@playwright/test";

test("Perform visual regression testing on the main menu", async ({ page }) => {
  await page.goto("https://www.ilry.fi/en/");

  page.click("span.nav-toggle__text");

  const menu = page.locator('nav[aria-label="Main menu"]');
  await expect(menu).toBeVisible();

  const dynamicElements = [
    page.locator('span.b-changing-text__suffix.transition-out')
  ];

    await expect(menu).toHaveScreenshot({
    mask: dynamicElements,
    maxDiffPixels: 100
  });
});