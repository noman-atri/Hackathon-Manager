import { test, expect } from "@playwright/test";

test.describe("Editing existing team tests", () => {
  test("Edit selected team - Happy Flow", async ({ page }) => {
    // Go to homepage
    await page.goto("/");

    // Click the first team ID link to go to Edit page
    // Header row = 0, first data row = 1
    const firstTeamRow = page.getByRole("row").nth(1);

    const teamIdLink = firstTeamRow.getByRole("link");
    await teamIdLink.click();

    // Assert we are on Edit Team page
    await expect(
      page.getByRole("heading", { name: /edit team/i }),
    ).toBeVisible();

    // Assert fields are pre-filled
    const teamNameInput = page.getByLabel(/team name/i);
    const originalTeamName = await teamNameInput.inputValue();

    expect(originalTeamName).not.toBe("");

    // Update Team Name
    const updatedTeamName = `${originalTeamName} Updated`;
    await teamNameInput.fill(updatedTeamName);

    // Submit update
    await page.getByRole("button", { name: /update/i }).click();

    // Wait for navigation back to homepage (SPA navigation)
    await page.waitForURL("/");

    // Assert updated team name appears in table
    await expect(page.getByText(updatedTeamName)).toBeVisible();
  });

  test("test form validation errors for required fields", async ({ page }) => {
    // Go to homepage
    await page.goto("/");

    // Click the first team ID link to go to Edit page
    // Header row = 0, first data row = 1
    const firstTeamRow = page.getByRole("row").nth(1);

    await firstTeamRow.getByRole("link").click();

    // Fill in the team name
    await page.getByLabel(/team name/i).fill("");

    // Fill in the project name
    await page.getByLabel(/project name/i).fill("");

    // Fill in the members count
    await page.getByLabel(/members count/i).fill("");

    // Submit the form
    await page.getByRole("button", { name: /update/i }).click();

    // Assert validation errors are visible

    await expect(page.getByText(/team name is required/i)).toBeVisible();

    await expect(page.getByText(/project name is required/i)).toBeVisible();

    await expect(page.getByText(/members count is required/i)).toBeVisible();
  });
});
