// Listas dispositivo
fetch('http://h2oherogame.somee.com/api/Dispositivo')
.then(response => response.json())
.then(data => {
  const ul = document.getElementById('dispositivos');
  data.forEach(dispositivo => {
    const li = document.createElement('li');
    li.classList.add('listdispositivos');
    li.innerHTML = `<img class="iconmenu" src="svg/Cactus.svg" alt="" > ${dispositivo.nombreDispositivo} | ${dispositivo.descripcion} | ${dispositivo.tipoDispositivoId} | <a class="acciones editar" href="" data-id="${dispositivo.dispositivoId}">Editar </a><a class="acciones borrar" href="" data-id="${dispositivo.dispositivoId}"> | Borrar</a>`;
    ul.appendChild(li);
  });


     // consulta unica
     document.getElementById('consultarDispositivo').addEventListener('click', function() {
      const id = document.getElementById('dispositivoById').value; 
    
      fetch(`http://h2oherogame.somee.com/api/Dispositivo/${id}`)
          .then(response => response.json())
          .then(data => {
              const resultadoDiv = document.getElementById('resultadoDispositivo');
              resultadoDiv.innerHTML = `<img class="iconmenu" src="svg/Cactus.svg" alt="" > ${data.nombreDispositivo} | ${data.descripcion} | ${data.tipoDispositivoId} | <a class="acciones editar" href="" data-id="${data.dispositivoId}">Editar </a><a class="acciones borrar" href="" data-id="${data.dispositivoId}"> | Borrar</a>`;
          })
          .catch(error => {
              alert('Dispositivo no encontrado');
          });
    });


  // Borrar dispositivo
  const borrarLinks = document.querySelectorAll('.borrar');
  borrarLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const id = this.dataset.id;
      fetch(`http://h2oherogame.somee.com/api/Dispositivo/${id}`, {
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
      document.getElementById('crearDispositivo').addEventListener('click', function() {
      document.getElementById('crearDispositivoForm').style.display = 'block';
      document.getElementById('overlay').style.display = 'none';
      });
      const nuevoDispositivoForm = document.getElementById('nuevo-dispositivo-form');
      const cancelButton =document.getElementById('cancelDispositivo');
      cancelButton.addEventListener('click', function() {
      document.getElementById('crearDispositivoForm').style.display = 'none';
      document.getElementById('overlay').style.display = 'none';
      });

      nuevoDispositivoForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nombreDispositivo = document.getElementById('creanombreDispositivo').value;
      const descripcion = document.getElementById('creadescripcionDis').value;
      const tipoDispositivoId = document.getElementById('creatipoDispositivoId').value;

      const response = await fetch(`http://h2oherogame.somee.com/api/Dispositivo?NombreDispositivo=${nombreDispositivo}&Descripcion=${descripcion}&TipoDispositivoId=${tipoDispositivoId}`, {
          method: 'POST'
      });

      if (response.status === 200) {
          alert('Dispositivo creado correctamente');
      } else {
          alert('Error al crear el Dispositivo');
      }
  });

  // editar dispositivo
  document.getElementById('cancelButtondispositivo').addEventListener('click', function() {
    document.getElementById('editFormdispositivo').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
  });
  
  const editarLinks = document.querySelectorAll('.editar');
  editarLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const id = this.dataset.id;
      const dispositivoEncontrado = data.find(dispositivo => dispositivo.dispositivoId == id);
      document.getElementById('editDispositivoId').value = dispositivoEncontrado.dispositivoId;
      document.getElementById('editNombreDispositivo').value = dispositivoEncontrado.nombreDispositivo;
      document.getElementById('editDescripcionDis').value = dispositivoEncontrado.descripcion;
      document.getElementById('editTipoDispositivoIdDis').value = dispositivoEncontrado.tipoDispositivoId;
      document.getElementById('editFormdispositivo').style.display = 'block';
    });
  });

  document.getElementById('saveButtondispositivo').addEventListener('click', function() {
    const dispositivoId = document.getElementById('editDispositivoId').value;
    const nombreDispositivo = document.getElementById('editNombreDispositivo').value;
    const descripcion = document.getElementById('editDescripcionDis').value;
    const tipoDispositivoId = document.getElementById('editTipoDispositivoIdDis').value;
    fetch(`http://h2oherogame.somee.com/api/Dispositivo/${dispositivoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        dispositivoId: dispositivoId,
        nombreDispositivo: nombreDispositivo,
        descripcion: descripcion,
        tipoDispositivoId: tipoDispositivoId
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
