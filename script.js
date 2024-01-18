/*
  This is your site JavaScript code - you can add interactivity!
*/

// Print a message in the browser's dev tools console each time the page loads
// Use your menus or right-click / control-click and choose "Inspect" > "Console"
console.log("Hello 🌎");

/* 
Make the "Click me!" button move when the visitor clicks it:
- First add the button to the page by following the steps in the TODO 🚧
*/
const btn = document.querySelector("button"); // Get the button from the page
if (btn) { // Detect clicks on the button
  btn.onclick = function () {
    // The 'dipped' class in style.css changes the appearance on click
    btn.classList.toggle("dipped");
  };
}


// ----- GLITCH STARTER PROJECT HELPER CODE -----

// Open file when the link in the preview is clicked
let goto = (file, line) => {
  window.parent.postMessage(
    { type: "glitch/go-to-line", payload: { filePath: file, line: line } }, "*"
  );
};
// Get the file opening button from its class name
const filer = document.querySelectorAll(".fileopener");
filer.forEach((f) => {
  f.onclick = () => { goto(f.dataset.file, f.dataset.line); };
});

function iniciar() {
  // Agregamos el evento submit al formulario
  const formulario = document.querySelector('form');
  formulario.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitamos que el formulario se envíe y la página se recargue
    calcularHipoteca(); // Llamamos a la función calcularHipoteca
  });

  // Llamamos a la función calcularHipoteca para mostrar la tabla y el monto total al cargar la página
  calcularHipoteca();
}

function calcularHipoteca() {
  const monto_prestamo = parseFloat(document.getElementById('monto').value);
  let tasa_interes_anual = parseFloat(document.getElementById('tasa').value.replace(',', '.'));
  const plazo_prestamo_anios = parseInt(document.getElementById('plazo').value);
  const tipo_pago = 'mensual';

  const tasa_interes_mensual = ((1 + tasa_interes_anual / 100) ** (1 / 12) - 1);
  const plazo_prestamo_meses = plazo_prestamo_anios * 12;
  const pago_mensual = (monto_prestamo * (tasa_interes_mensual * (1 + tasa_interes_mensual)**plazo_prestamo_meses))/((1 + tasa_interes_mensual)**plazo_prestamo_meses - 1);

  const tabla_amortizacion = [];
  let saldo_inicial = monto_prestamo;
  let intereses_totales_pagados = 0;
  for (let mes = 1; mes <= plazo_prestamo_meses; mes++) {
    const interes = saldo_inicial * tasa_interes_mensual;
    const capital = pago_mensual - interes;
    const saldo_final = saldo_inicial - capital;

    const periodo_pago = {
      Mes: mes,
      'Saldo inicial': saldo_inicial.toFixed(2),
      Pago: pago_mensual.toFixed(2),
      Interés: interes.toFixed(2),
      Capital: capital.toFixed(2),
      'Saldo final': saldo_final.toFixed(2)
    };

    tabla_amortizacion.push(periodo_pago);

    saldo_inicial = saldo_final;
    intereses_totales_pagados += interes;
  }

  const tablaElement = document.getElementById('tabla-amortizacion');
  tablaElement.innerHTML = '';

  // Filas de la tabla
  const filasVisibles = tabla_amortizacion; // Obtener solo las primeras 7 filas
  filasVisibles.forEach(periodo_pago => {
    const filaElement = document.createElement('tr');
    filaElement.innerHTML = `
      <td>${periodo_pago.Mes}</td>
      <td>${periodo_pago['Saldo inicial']}</td>
      <td>${periodo_pago.Pago}</td>
      <td>${periodo_pago.Interés}</td>
      <td>${periodo_pago.Capital}</td>
      <td>${periodo_pago['Saldo final']}</td>
    `;
    tablaElement.appendChild(filaElement);
  });



  // Agregamos la tabla al contenedor en la página
  const contenedorTabla = document.getElementById('tabla-amortizacion');
  contenedorTabla.appendChild(tabla);

  // Resto del código...
}

// Llamamos a la función iniciar al cargar la página
document.addEventListener('DOMContentLoaded', iniciar);

