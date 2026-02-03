import { test, expect } from '@playwright/test';

test.describe('Landing page testing', () => {

  test("has title", async ({ page }) => {
    await page.goto("http://localhost:5173/");

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle("hackathon-manager");
  });

  test('test case for landing page header', async ({ page }) => {
    await page.goto("http://localhost:5173/");

    // Example assertion
    const header = page.locator('h5');
    await expect(header).toHaveText("Registered Teams");
  });
}); 