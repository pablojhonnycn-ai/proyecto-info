
function mostrarFecha() {
    const fechaHoy = new Date(); 
    const dia = fechaHoy.getDate();
    const mes = fechaHoy.getMonth() + 1; 
    const anio = fechaHoy.getFullYear();
  
    const fechaFormateada = `${dia}/${mes}/${anio}`;
  
    document.getElementById('fecha').innerText = `dia de hoy: ${fechaFormateada}`;
  }

  window.onload = mostrarFecha;
  

 const secciones = document.getElementById("secciones");

function mostrarDiscurso() {
  secciones.innerHTML = `
    <h1 class="t-discurso">Nuestra Institucion</h1>
    <h3 class="discurso">
      La Unidad Educativa Técnico-Humanística "Carlos Peredo Sandoval" <br>
      forma estudiantes con valores, disciplina y vocación de servicio. <br>
      Promovemos una educación integral que combina ciencia, tecnología y formación humanista, <br>
      inspirando a cada joven a alcanzar su máximo potencial. <br>
      Nuestro compromiso es construir una comunidad educativa unida, solidaria <br>
      y orientada al progreso de nuestra sociedad, fomentando la creatividad, el trabajo en equipo <br>
      y la formación de líderes responsables y comprometidos con el bienestar de los demás.
    </h3>
  `;
}

// Mostrar al cargar si la ventana es grande
if(window.innerWidth > 700){
  mostrarDiscurso();
}

// Actualizar al redimensionar
window.addEventListener("resize", () => {
  if(window.innerWidth > 700){
    mostrarDiscurso();
  } else {
    secciones.innerHTML = '';
  }
});
