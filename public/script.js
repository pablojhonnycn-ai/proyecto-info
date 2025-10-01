
function mostrarFecha() {
    const fechaHoy = new Date(); 
    const dia = fechaHoy.getDate();
    const mes = fechaHoy.getMonth() + 1; 
    const anio = fechaHoy.getFullYear();
  
    const fechaFormateada = `${dia}/${mes}/${anio}`;
  
    document.getElementById('fecha').innerText = `dia de hoy: ${fechaFormateada}`;
  }

  window.onload = mostrarFecha;
  


const calendario=document.getElementById("calendario");

if (window.innerWidth > 800) {
  calendario.innerHTML=``;
  calendario.innerHTML+=`<calendar-range class="calendario2" months="2">
  <div class="grid">
    <calendar-month offset="0"></calendar-month>
  </div>
</calendar-range>`
} else {
  calendario.innerHTML=""
}


window.addEventListener("resize", () => {
  console.log("Nuevo ancho:", window.innerWidth);
  console.log("Nuevo alto:", window.innerHeight);

  if (window.innerWidth > 800) {
    calendario.innerHTML=``;
    calendario.innerHTML+=`<calendar-range class="calendario2" months="2">
    <div class="grid">
      <calendar-month offset="0"></calendar-month>
    </div>
  </calendar-range>`
  } else {
    calendario.innerHTML=""
  }
});
