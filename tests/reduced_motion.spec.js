import { test, expect } from "@playwright/test";
// Does the site respect the reduced motion settings?
// https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion

test("respect the reduced motion settings", async ({ page }) => {
  await page.goto("https://www.ilry.fi/en/");

  // Check the reduced motion setting.
  const prefersReducedMotion = await page.evaluate(() => {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  const animation = await page.evaluate(() => {
    return window.getComputedStyle(document.body).getPropertyValue("animation");
  });

  // If prefers-reduced-motion is true, animation should be none.
  if (prefersReducedMotion) {
    expect(animation).toBe("none");
  }
});
