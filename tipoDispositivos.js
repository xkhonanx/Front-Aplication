// Listas tipoDispositivo
fetch('http://h2oherogame.somee.com/api/TipoDispositivo')
.then(response => response.json())
.then(data => {
  const ul = document.getElementById('tipoDispositivos');
  data.forEach(tipoDispositivo => {
    const li = document.createElement('li');
    li.classList.add('listtipoDispositivos');
    li.innerHTML = `<img class="iconmenu" src="svg/Cactus.svg" alt="" > ${tipoDispositivo.nombreTipoDispositivo} | <a class="acciones editar" href="" data-id="${tipoDispositivo.tipoDispositivoId}">Editar </a><a class="acciones borrar" href="" data-id="${tipoDispositivo.tipoDispositivoId}"> | Borrar</a>`;
    ul.appendChild(li);
  });


  document.getElementById('consultarTipoDispositivo').addEventListener('click', function() {
    const id = document.getElementById('tipodispositivoById').value; 
  
    fetch(`http://h2oherogame.somee.com/api/TipoDispositivo/${id}`)
        .then(response => response.json())
        .then(data => {
            const resultadoDiv = document.getElementById('resultadoTipoDispositivo');
            resultadoDiv.innerHTML = `<img class="iconmenu" src="svg/Cactus.svg" alt="" > ${data.nombreTipoDispositivo} | <a class="acciones editar" href="" data-id="${data.tipoDispositivoId}">Editar </a><a class="acciones borrar" href="" data-id="${data.tipoDispositivoId}"> | Borrar</a>`;
        })
        .catch(error => {
            alert('Tipo de dispositivo no encontrado');
        });
  });


  // Borrar tipoDispositivo
  const borrarLinks = document.querySelectorAll('.borrar');
  borrarLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const id = this.dataset.id;
      fetch(`http://h2oherogame.somee.com/api/TipoDispositivo/${id}`, {
        method: 'DELETE'
      })
      .then(response => response.json())
      .then(data => {
        location.reload();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    });
  });

     // crear jugadores
      document.getElementById('crearTipoDispositivo').addEventListener('click', function() {
      document.getElementById('crearTipoDispositivoForm').style.display = 'block';
      document.getElementById('overlay').style.display = 'none';
      });
      const nuevoTipoDispositivoForm = document.getElementById('nuevo-tipodispositivo-form');
      const cancelButton =document.getElementById('cancelTipoDispositivo');
      cancelButton.addEventListener('click', function() {
      document.getElementById('crearTipoDispositivoForm').style.display = 'none';
      document.getElementById('overlay').style.display = 'none';
      });

      nuevoTipoDispositivoForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nombreTipoDispositivo = document.getElementById('creanombreTipoDispositivo').value;

      const response = await fetch(`http://h2oherogame.somee.com/api/TipoDispositivo?NombreTipoDispositivo=${nombreTipoDispositivo}`, {
          method: 'POST'
      });

      if (response.status === 200) {
          alert('Tipo de dispositivo creado correctamente');
      } else {
          alert('Error al crear el tipo de dispositivo');
      }
  });



  // editar tipoDispositivo
  document.getElementById('cancelButtontipodispositivo').addEventListener('click', function() {
    document.getElementById('editFormtipoDispositivo').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
  });
  
  const editarLinks = document.querySelectorAll('.editar');
  editarLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const id = this.dataset.id;
      const tipoDispositivoEncontrado = data.find(tipoDispositivo => tipoDispositivo.tipoDispositivoId == id);
      document.getElementById('edittipoDispositivoId').value = tipoDispositivoEncontrado.tipoDispositivoId;
      document.getElementById('editnombreTipoDispositivo').value = tipoDispositivoEncontrado.nombreTipoDispositivo;
      document.getElementById('editFormtipoDispositivo').style.display = 'block';
    });
  });

  document.getElementById('saveButtontipodispositivo').addEventListener('click', function() {
    const tipoDispositivoId = document.getElementById('edittipoDispositivoId').value;
    const nombreTipoDispositivo = document.getElementById('editnombreTipoDispositivo').value;
    fetch(`http://h2oherogame.somee.com/api/TipoDispositivo/${tipoDispositivoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tipoDispositivoId: tipoDispositivoId,
        nombreTipoDispositivo: nombreTipoDispositivo
      })
    })
    .then(response => response.json())
    .then(data => {
      location.reload();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  });
})
.catch((error) => {
  console.error('Error:', error);
});