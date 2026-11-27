# Calidad · facturación

![CI](https://github.com/diiegoc1/pruebas-automaticas/actions/workflows/ci.yml/badge.svg?branch=master)

Validación de CUIT y cálculo de totales de una factura, con pruebas automáticas.

## Calidad
- 19 pruebas unitarias (Vitest) · cobertura de líneas: 100%
- 1 prueba de punta a punta (Playwright)
- Linter (ESLint) y CI en cada pull request

## Pruebas con Stryker
- Sobreviven 2 mutantes equivalentes en validarCuit (valor por defecto de null y el chequeo explícito del verificador 10): no cambian el resultado.

## Cómo correrlo
npm install
npm test
npm run e2e