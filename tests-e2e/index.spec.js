import { test, expect } from '@playwright/test';

test.describe('Index page', () => {
    test('should display events list on load', async ({ page }) => {
        await page.goto('http://localhost:3000/');
        
        const eventListDiv = await page.locator('#eventList');
        
        await expect(eventListDiv).toBeVisible();
    });

    test('should display validation error on start time greater than end time', async ({ page }) => {
        await page.goto('http://localhost:3000/');

        const startTimeField = await page.getByLabel('Start');
        const endTimeField = await page.getByLabel('End');
        const endTimeErrorP = await page.locator('#endTimeError');

        await startTimeField.fill('2026-01-01T00:00');
        await endTimeField.fill('2025-12-31T23:59');
        await page.getByRole('button', { name: 'submit' }).click();

        await expect(endTimeErrorP).toHaveText('End Time cannot be earlier than Start Time.');
    });

    test('should display validation error on invalid input', async ({ page }) => {
        await page.goto('http://localhost:3000/');

        const titleErrorP = await page.locator('#titleError');
        const descriptionErrorP = await page.locator('#descriptionError');
        const locationErrorP = await page.locator('#locationError');
        const categoryErrorP = await page.locator('#categoryError');
        const startTimeErrorP = await page.locator('#startTimeError');
        const endTimeErrorP = await page.locator('#endTimeError');

        await page.getByRole('button', { name: 'submit' }).click();

        await expect(titleErrorP).toContainText('Title is required.');
        await expect(descriptionErrorP).toContainText('Description is required.');
        await expect(locationErrorP).toContainText('Location is required.');
        await expect(categoryErrorP).toContainText('Category is required.');
        await expect(startTimeErrorP).toContainText('Start Time is required.');
        await expect(endTimeErrorP).toContainText('End Time is required.');
    });
});