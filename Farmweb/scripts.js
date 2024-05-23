function openTab(tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove("activer");
    }
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.classList.add("activer");
  }

  // Obtener referencia al botón y al popup
const botonAbrirPopup = document.getElementById('abrirPopup');
const popup = document.getElementById('popup');
const overlay = document.getElementById('overlay');
const botonCerrarPopup = document.getElementById('close');

// Función para abrir el popup y mostrar el overlay
function abrirPopup() {
    popup.classList.add('mostrar');
    overlay.style.display = 'block';
}

// Función para cerrar el popup y ocultar el overlay
function cerrarPopup() {
    popup.classList.remove('mostrar');
    overlay.style.display = 'none';
}

// Evento para abrir el popup y mostrar el overlay cuando se hace clic en el botón
botonAbrirPopup.addEventListener('click', abrirPopup);

// Evento para cerrar el popup y ocultar el overlay cuando se hace clic en la "x"
botonCerrarPopup.addEventListener('click', cerrarPopup);

// Evento para cerrar el popup y ocultar el overlay cuando se hace clic fuera del área del popup
overlay.addEventListener('click', cerrarPopup);
