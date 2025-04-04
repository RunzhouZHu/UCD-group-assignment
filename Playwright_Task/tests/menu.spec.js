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
    await expect(response.status()).toBe(200);  
    }
  await browser.close();
});