# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: cuit.spec.js >> valida el CUIT mientras se escribe
- Location: e2e\cuit.spec.js:3:1

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  getByRole('status')
Expected: "✗ CUIT inválido"
Received: ""
Timeout:  5000ms

Call log:
  - Expect "toHaveText" getByRole('status') with timeout 5000ms
  - waiting for getByRole('status')
    12 × locator resolved to <p role="status" id="resultado"></p>
       - unexpected value ""

```

```yaml
- heading "Datos del cliente" [level=1]
- text: CUIT
- textbox "CUIT": "20123456785"
- status
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test("valida el CUIT mientras se escribe", async ({ page }) => {
  4  |   await page.goto("/");
  5  |   const campo = page.getByLabel("CUIT");
  6  |   const resultado = page.getByRole("status");
  7  | 
  8  |   await campo.fill("20123456785");
> 9  |   await expect(resultado).toHaveText("✗ CUIT inválido");
     |                           ^ Error: expect(locator).toHaveText(expected) failed
  10 | 
  11 |   await campo.fill("20123456786");
  12 |   await expect(resultado).toHaveText("✓ CUIT válido: 20-12345678-6");
  13 | });
```