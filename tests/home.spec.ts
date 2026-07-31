import { test, expect } from '@playwright/test';

test('home page shows the KubeAstronaut certification showcase', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'KubeAstronaut' })).toBeVisible();
  await expect(page.getByText('Elite Achievement')).toBeVisible();
  await expect(page.getByText('CKA', { exact: true })).toBeVisible();
});
