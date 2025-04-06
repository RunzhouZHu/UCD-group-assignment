import { test, expect } from "@playwright/test";

test("Search salary info for engineers graduating in 2025", async ({ page }) => {
  await page.goto("https://www.ilry.fi/en");

  await page.click('button[class="search-toggle"]');
  await page.fill('input[class="findkit--search-input"]', "salary information for engineers graduating in 2025");

  await page.click('a[href="https://www.ilry.fi/en/starting-a-career/working-student/students-salary-matters/"]');
  await page.waitForTimeout(1000);

  await page.waitForSelector("div.main-content#content");
  await page.waitForSelector("div.wp-block-table-wrapper");

  const blocks = await page.$$("div.wp-block-table-wrapper");
  let foundExpectedText = false;

  for (const block of blocks) {
    const blockText = await block.innerText();
    console.log("\n", blockText, "\n");

    if (blockText.includes("Number of studies completed in credits")) {
      foundExpectedText = true;
      break;
    }
  }

  expect(foundExpectedText).toBe(true);
});
