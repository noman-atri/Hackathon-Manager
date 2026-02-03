import { test, expect } from "@playwright/test";

test.describe("Deleting existing team tests", () => {
  test("user can delete a team from edit page", async ({ page }) => {
    // Go to homepage
    await page.goto("/");

    // Capture the first team name from the table
    const firstDataRow = page.getByRole("row").nth(1);
    const teamNameCell = firstDataRow.getByRole("cell").nth(1); // Team Name column
    const teamName = (await teamNameCell.textContent())?.trim();

    expect(teamName).toBeTruthy();

    // Click the team ID link to open Edit page
    await firstDataRow.getByRole("link").click();

    // Assert Edit page is visible
    await expect(
      page.getByRole("heading", { name: /edit team/i }),
    ).toBeVisible();

    // Click Delete button
    await page.getByRole("button", { name: /delete/i }).click();

    // Confirm delete in dialog
    await page.getByRole("button", { name: /^delete$/i }).click();

    // Wait for navigation back to homepage (SPA navigation)
    await page.waitForURL("/");

    // Assert deleted team is no longer visible
    await expect(page.getByText(teamName as string)).not.toBeVisible();
  });
});
