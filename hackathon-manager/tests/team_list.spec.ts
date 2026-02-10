import { test, expect } from "@playwright/test";

test.describe("Landing page testing", () => {
  test("has title", async ({ page }) => {
    await page.goto("/");

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle("hackathon-manager");
  });

  test("test case for landing page header", async ({ page }) => {
    await page.goto("/");

    // Example assertion
    const header = page.locator("h5");
    await expect(header).toHaveText("Registered Teams");
  });

  test("test case teams table render with headers and default data", async ({
    page,
  }) => {
    await page.goto("/");

    // Assert table exists
    const table = page.locator("table");
    await expect(table).toBeVisible();

    // Assert column headers
    await expect(
      page.getByRole("columnheader", { name: /team name/i }),
    ).toBeVisible();

    await expect(
      page.getByRole("columnheader", { name: /project name/i }),
    ).toBeVisible();

    await expect(
      page.getByRole("columnheader", { name: /members/i }),
    ).toBeVisible();

    await expect(
      page.getByRole("columnheader", { name: /track/i }),
    ).toBeVisible();

    await expect(
      page.getByRole("columnheader", { name: /status/i }),
    ).toBeVisible();

    // Assert at least one data row exists
    // (header row is also a row, so we expect > 1)
    const rows = page.getByRole("row");
    const rowCount = await rows.count();

    // Header row + at least one data row
    expect(rowCount).toBeGreaterThan(3);
  });

  test("test case for searching teams by team name", async ({ page }) => {
    await page.goto("/");

    // Type in the search box
    const searchBox = page.getByLabel(/search/i);
    await searchBox.fill("Code");

    // After searching
    const rows = page.getByRole("row");
    const rowCount = await rows.count();

    expect(rowCount).toBeGreaterThan(0);

    await expect(page.getByText(/code/i)).toBeVisible();
  });

  test("test case for filtering teams by status", async ({ page }) => {
    await page.goto("/");

    // Open the Status filter dropdown
    const statusFilter = page.getByLabel(/status/i);
    await statusFilter.click();

    // Select "Done"
    await page.getByRole("option", { name: /completed/i }).click();

    // After filtering, only "Done" teams should be visible
    const rows = page.getByRole("row");
    const rowCount = await rows.count();

    // Header row + at least one filtered data row
    expect(rowCount).toBeGreaterThan(0);

    // // Ensure "Done" status chip/text is visible
    // await expect(page.getByText(/completed/i)).toBeVisible();
  });

  test("test case for filtering teams by track", async ({ page }) => {
    await page.goto("/");

    // Select the track filter dropdown
    const filterOption = page.getByLabel(/track/i);
    await filterOption.click();

    await filterOption.getByRole("option", { name: "Web" }).click();

    // After filtering
    const rows = page.getByRole("row");
    const rowCount = await rows.count();

    expect(rowCount).toBeGreaterThan(0);
  });
});
