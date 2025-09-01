
function mostrarFecha() {
    const fechaHoy = new Date(); // obtiene la fecha y hora actual
    const dia = fechaHoy.getDate();
    const mes = fechaHoy.getMonth() + 1; // Enero = 0
    const anio = fechaHoy.getFullYear();
  
    // Formato: dd/mm/yyyy
    const fechaFormateada = `${dia}/${mes}/${anio}`;
  
    document.getElementById('fecha').innerText = `dia de hoy: ${fechaFormateada}`;
  }
  
  // Ejecutar al cargar la página
  window.onload = mostrarFecha;
  