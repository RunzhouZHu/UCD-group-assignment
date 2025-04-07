# ILRY.fi Playwright Testing Suite

This repository contains an automated test suite for validating key accessibility, UI, and functionality aspects of the [ilry.fi](https://www.ilry.fi/en/) website using [Playwright](https://playwright.dev/).

## Team
Pop Alex
Loc Dang
Zhu Runzhou

## Test Coverage

The following test scenarios are included:

- **Reduced Motion Compliance**
  - Verifies if the website respects `prefers-reduced-motion` accessibility settings.
- **Main Menu Link Validation**
  - Checks that all links in the main navigation respond with HTTP 200.
- **Visual Regression Testing**
  - Captures snapshots of the main menu and masks dynamic content for stability.
- **Salary Information Search**
  - Tests the search functionality for engineer salary data (graduates in 2025).


### Prerequisites

- Node.js ≥ 16
- npm
- Git LFS

### Install Dependencies

```bash
npm install
```

## Commands

### Run All Tests
```bash
npm run test
```

All tests are run using the Firefox browser in headless mode.

### Run a Specific Test File
```bash
npx playwright test tests/menu.spec.js
```