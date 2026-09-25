import { test, expect } from '@playwright/test';

test('home page shows the KubeAstronaut certification showcase', async ({
  page,
}) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { name: 'KubeAstronaut' }),
  ).toBeVisible();
  await expect(page.getByText('Elite Achievement')).toBeVisible();
  // Cert pills render with a prefix icon (e.g. "✦ CKA"), so match the label loosely
  await expect(page.getByText(/\bCKA\b/).first()).toBeVisible();
});
