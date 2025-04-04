const { firefox } = require('playwright');

(async () => {
  // Launch Firefox browser in headless mode
  const browser = await firefox.launch();
  const page = await browser.newPage();

  // Navigate to the website
  await page.goto('https://www.ilry.fi/en/');

  // Select all main menu links
  const mainMenuLinks = await page.$$eval('nav a', links => links.map(link => link.href));

  // Check each link's accessibility
  for (const link of mainMenuLinks) {
    const response = await page.goto(link);
    if (response) {
      console.log(`URL: ${link} - Status: ${response.status()} - ${response.ok() ? 'Accessible' : 'Not Accessible'}`);
    } else {
      console.log(`URL: ${link} - Failed to load`);
    }
  }

  // Close the browser
  await browser.close();
})();
