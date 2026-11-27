import { test, expect } from "@playwright/test";

test("valida el CUIT mientras se escribe", async ({ page }) => {
  await page.goto("/");
  const campo = page.getByLabel("CUIT");
  const resultado = page.getByRole("status");

  await campo.fill("20123456785");
  await expect(resultado).toHaveText("✗ CUIT inválido");

  await campo.fill("20123456786");
  await expect(resultado).toHaveText("✓ CUIT válido: 20-12345678-6");
});