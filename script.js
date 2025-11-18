// Precios
const PRECIO_VIP = 50;
const PRECIO_BUTACAS = 30;
const PRECIO_GENERALES = 15;

// Acumuladores generales
let totalVIP = 0;
let totalButacas = 0;
let totalGenerales = 0;

let dineroVIP = 0;
let dineroButacas = 0;
let dineroGenerales = 0;

// Historial de ventas
let historialVentas = [];

function registrarVenta() {
    let cliente = document.getElementById("cliente").value.trim();
    let vip = parseInt(document.getElementById("vip").value) || 0;
    let butacas = parseInt(document.getElementById("butacas").value) || 0;
    let generales = parseInt(document.getElementById("generales").value) || 0;

    if (cliente === "") {
        alert("Debe ingresar el nombre del cliente.");
        return;
    }
    if (vip < 0 || butacas < 0 || generales < 0) {
        alert("Las cantidades no pueden ser negativas.");
        return;
    }

    // Acumular global
    totalVIP += vip;
    totalButacas += butacas;
    totalGenerales += generales;

    dineroVIP += vip * PRECIO_VIP;
    dineroButacas += butacas * PRECIO_BUTACAS;
    dineroGenerales += generales * PRECIO_GENERALES;

    let totalCliente = (vip * PRECIO_VIP) + (butacas * PRECIO_BUTACAS) + (generales * PRECIO_GENERALES);

    // Guardar en historial
    historialVentas.push({
        cliente: cliente,
        vip: vip,
        butacas: butacas,
        generales: generales,
        total: totalCliente
    });

    mostrarResumen();
    mostrarHistorial();

    // Limpiar campos
    document.getElementById("cliente").value = "";
    document.getElementById("vip").value = 0;
    document.getElementById("butacas").value = 0;
    document.getElementById("generales").value = 0;
}

function mostrarResumen() {
    let totalBoletos = totalVIP + totalButacas + totalGenerales;
    let totalDinero = dineroVIP + dineroButacas + dineroGenerales;

    document.getElementById("resumen").innerHTML = `
        <strong>Total por Categoría</strong><br>
        VIP: ${totalVIP} boletos — $${dineroVIP.toFixed(2)}<br>
        Butacas: ${totalButacas} boletos — $${dineroButacas.toFixed(2)}<br>
        Generales: ${totalGenerales} boletos — $${dineroGenerales.toFixed(2)}<br><br>

        <strong>Total General</strong><br>
        Boletos Vendidos: ${totalBoletos}<br>
        Dinero Recaudado: $${totalDinero.toFixed(2)}
    `;
}

function mostrarHistorial() {
    let contenedor = document.getElementById("historial");
    contenedor.innerHTML = "";

    historialVentas.forEach(venta => {
        contenedor.innerHTML += `
            <div>
                <strong>${venta.cliente}</strong><br>
                VIP: ${venta.vip} | Butacas: ${venta.butacas} | Generales: ${venta.generales}<br>
                Total Pagado: $${venta.total.toFixed(2)}
            </div>
        `;
    });
}
