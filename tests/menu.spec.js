import { test, expect } from "@playwright/test";
import { firefox } from "playwright";

const getLinksFromMenu = async (page) => {
  const nav = page.getByRole('navigation');
  const links = await nav.getByRole('link').all();
  const hrefs = await Promise.all(links.map(link => link.getAttribute('href')));
  return hrefs.filter(Boolean);
};

test("Main menu links should be validated", async ({ page }) => {
  await page.goto('https://www.ilry.fi/en/');
  const mainMenuLinks = await getLinksFromMenu(page);
  for (const link of mainMenuLinks) {
    const response = await page.goto(link);
    expect(response.status()).toBe(200);
  }
});

