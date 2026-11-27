const TIPOS = ["20", "23", "24", "27", "30", "33", "34"];
const PESOS = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];

export function validarCuit(valor) {
  const s = String(valor ?? "").replace(/[-\s.]/g, "");
  if (!/^\d{11}$/.test(s)) return false;
  if (!TIPOS.includes(s.slice(0, 2))) return false;
  const suma = PESOS.reduce((total, peso, i) => total + peso * Number(s[i]), 0);
  let verificador = 10 - (suma % 11);
  if (verificador === 11) verificador = 0;
  if (verificador === 10) return false;
  return verificador === Number(s[10]);
}



const redondear = (x) => Math.round((x + Number.EPSILON) * 100) / 100;

export function calcularTotal(renglones, { descuento = 0, iva = 21 } = {}) {
  if (!Array.isArray(renglones) || renglones.length === 0)
    throw new Error("La factura no tiene renglones");
  if (descuento < 0 || descuento > 100)
    throw new RangeError("El descuento va de 0 a 100");
  const subtotal = renglones.reduce((total, r) => {
    if (!(r.cantidad > 0) || !(r.precio >= 0))
      throw new RangeError("Cantidad o precio inválido");
    return total + r.cantidad * r.precio;
  }, 0);
  const montoDescuento = redondear((subtotal * descuento) / 100);
  const neto = redondear(subtotal - montoDescuento);
  const montoIva = redondear((neto * iva) / 100);
  return {
    subtotal: redondear(subtotal),
    descuento: montoDescuento,
    neto,
    iva: montoIva,
    total: redondear(neto + montoIva),
  };
}
