// @ts-check
import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("https://www.ilry.fi/en/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/The Union of Professional Engineers/);
});

test("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Installation" })
  ).toBeVisible();
});

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
  } else {
    expect(animation).not.toBe("none");
  }
});

// Select the main menu item and Perform visual regression testing on the main menu
test("Perform visual regression testing on the main menu", async ({ page }) => {
  await page.goto("https://www.ilry.fi/en/");

  // Select the main menu item
  page.click("span.nav-toggle__text");

  // Check that the URL has changed
  await expect(page).toHaveScreenshot({ maxDiffPixels: 100 });
});

// write a test that checks if all links on the page are working
test("check all links on the page are working", async ({ page }) => {
  await page.goto("https://www.ilry.fi/en/");

  // Get all links on the page
  const links = await page.locator("a").all();

  for (const link of links) {
    const href = await link.getAttribute("href");

    // Skip links without an href or with JavaScript void
    if (!href || href.startsWith("javascript:void")) {
      continue;
    }

    // Open the link in a new tab and check the response status
    const [newPage] = await Promise.all([
      page.context().waitForEvent("page"),
      link.click({ button: "middle" }), // Open in a new tab
    ]);

    const response = await newPage.waitForResponse((res) => res.url() === href);
    expect(response.status()).toBeLessThan(400); // Ensure the link is not broken
    await newPage.close();
  }
});
