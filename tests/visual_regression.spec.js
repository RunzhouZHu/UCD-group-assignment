import { test, expect } from "@playwright/test";

test("Perform visual regression testing on the main menu", async ({ page }) => {
  await page.goto("https://www.ilry.fi/en/");

  await page.getByRole('button', { name: /menu/i }).click();
  const menu = page.getByRole('navigation', { name: "Main menu" });
  await expect(menu).toBeVisible();

  const a11ySnapshot = await page.accessibility.snapshot({ interestingOnly: true });
  const roles = a11ySnapshot.children.map(child => child.role);
  console.log("Accessibility roles in the main menu:", roles);
  expect(roles.length).toBeGreaterThan(0);
  
  const dynamicElements = [
    page.locator('span.b-changing-text__suffix.transition-out')
  ];
  await expect(menu).toHaveScreenshot({
    mask: dynamicElements,
    maxDiffPixels: 100,
  });
});
