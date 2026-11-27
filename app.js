import { formatearCuit } from "./src/validadores.js";

const cuit = document.getElementById("cuit");
const resultado = document.getElementById("resultado");

cuit.addEventListener("input", () => {
  const formateado = formatearCuit(cuit.value);
  resultado.textContent = formateado ? `✓ CUIT válido: ${formateado}` : "✗ CUIT inválido";
});