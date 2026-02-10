import { test, expect } from "@playwright/test";

test.describe("Adding new team tests", () => {
  test("Adding a new team - happy path", async ({ page }) => {
    await page.goto("/create");

    // Fill in the team name
    await page.getByLabel(/team name/i).fill("Innovators");

    // Fill in the project name
    await page.getByLabel(/project name/i).fill("Smart Solutions");

    // Fill in the members count
    await page.getByLabel(/members count/i).fill("5");

    // Select track
    await page.locator("#track-select").click();
    await page.getByText("AI", { exact: true }).click();

    // Select status
    const statusRadio = page.getByLabel(/in-progress/i);
    await statusRadio.check();

    // Submit the form
    await page.getByRole("button", { name: /register/i }).click();

    // Verify that we are redirected to the home page
    // await expect(page).toHaveURL("/");

    // Verify form fields are reset
    await expect(page.getByLabel(/team name/i)).toHaveValue("");
    await expect(page.getByLabel(/project name/i)).toHaveValue("");
    await expect(page.getByLabel(/members count/i)).toHaveValue("");
    await expect(page.locator("#track-select")).toHaveText("");

    // redirect to home page
    await page.getByRole("link", { name: /teams/i }).click();
    await expect(page).toHaveURL("/");

    // Verify the new team appears in the teams table
    await expect(page.getByText("Innovators")).toBeVisible();
    await expect(page.getByText("Smart Solutions")).toBeVisible();
    // await expect(page.getByText("5")).toBeVisible();
    // await expect(page.getByText("AI")).toBeVisible();
    // await expect(page.getByText("In-Progress")).toBeVisible();
  });

  test("add team form shows validation errors for required fields", async ({
    page,
  }) => {
    // Go to Add Team page
    await page.goto("/create");

    // Submit the form without filling anything
    await page.getByRole("button", { name: /register/i }).click();

    // Assert validation errors are visible

    await expect(page.getByText(/team name is required/i)).toBeVisible();

    await expect(page.getByText(/project name is required/i)).toBeVisible();

    await expect(page.getByText(/members count is required/i)).toBeVisible();

    await expect(page.getByText(/track is required/i)).toBeVisible();

    // Ensure we are still on Add Team page (no navigation)
    await expect(page).toHaveURL("/create");
  });
});
