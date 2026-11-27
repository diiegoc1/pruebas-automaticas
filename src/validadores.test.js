import { describe, it, expect } from "vitest";
import { validarCuit, calcularTotal, formatearCuit } from "./validadores.js";

describe("validarCuit", () => {
it.each([
  "23-12345678-5",
  "24-12345678-1",
  "27-12345678-0",
  "33-12345678-0",
  "34-12345678-7",
])("acepta el CUIT válido %s de cada tipo", (cuit) => {
  expect(validarCuit(cuit)).toBe(true);
});

  it("rechaza un CUIT con un dígito de más", () => {
    expect(validarCuit("201234567866")).toBe(false);
    expect(validarCuit("20-12345678-66")).toBe(false);
  });

  it("acepta un CUIT cuyo verificador da 0", () => {
    expect(validarCuit("20-20000003-0")).toBe(true);
  });

  it("rechaza un CUIT cuyo verificador daría 10", () => {
    expect(validarCuit("20-20000009-1")).toBe(false);
  });


});


it.each([
  ["20-12345678-5", "dígito verificador mal"],
  ["21-12345678-2", "tipo que no existe"],
  ["20-1234567-6", "le falta un dígito"],
  ["20-1234S678-6", "tiene una letra"],
  ["", "vacío"],
  [null, "nulo"],
])("rechaza %s (%s)", (cuit) => {
  expect(validarCuit(cuit)).toBe(false);
});



describe("calcularTotal", () => {
  const renglones = [
    { cantidad: 2, precio: 1500 },
    { cantidad: 1, precio: 999.99 },
  ];
  it("acepta descuento de 0 y de 100, y precio 0", () => {
  expect(calcularTotal([{ cantidad: 1, precio: 1000 }], { descuento: 0 }).total).toBe(1210);
  expect(calcularTotal([{ cantidad: 1, precio: 1000 }], { descuento: 100 }).total).toBe(0);
  expect(calcularTotal([{ cantidad: 1, precio: 0 }]).total).toBe(0);
});

it("rechaza descuento negativo, cantidad 0 y precio negativo", () => {
  const uno = [{ cantidad: 1, precio: 10 }];
  expect(() => calcularTotal(uno, { descuento: -1 })).toThrow(RangeError);
  expect(() => calcularTotal([{ cantidad: 0, precio: 10 }])).toThrow(RangeError);
  expect(() => calcularTotal([{ cantidad: 1, precio: -1 }])).toThrow(RangeError);
});

  it("calcula subtotal, IVA y total", () => {
    const r = calcularTotal(renglones);
    expect(r.subtotal).toBe(3999.99);
    expect(r.iva).toBeCloseTo(840, 2);
    expect(r.total).toBeCloseTo(4839.99, 2);
  });

  it("aplica el descuento antes del IVA", () => {
    const r = calcularTotal(renglones, { descuento: 10 });
    expect(r.descuento).toBe(400);
    expect(r.neto).toBe(3599.99);
  });

  it("acepta IVA de 10,5%", () => {
    expect(calcularTotal([{ cantidad: 1, precio: 1000 }], { iva: 10.5 }).total).toBe(1105);
  });

  it("no acepta una factura vacía ni cantidades negativas", () => {
    expect(() => calcularTotal([])).toThrow("no tiene renglones");
    expect(() => calcularTotal([{ cantidad: -1, precio: 10 }])).toThrow("Cantidad o precio inválido");
    expect(() => calcularTotal(renglones, { descuento: 120 })).toThrow("El descuento va de 0 a 100");
  });
});


describe("formatearCuit", () => {
  it("pone los guiones", () => {
    expect(formatearCuit("20123456786")).toBe("20-12345678-6");
    expect(formatearCuit(" 30.71234567.1 ")).toBe("30-71234567-1");
  });

  it("devuelve null si el CUIT no es válido", () => {
    expect(formatearCuit("20123456785")).toBeNull();
  });
});

