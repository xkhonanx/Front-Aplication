// Listas accion
fetch('http://h2oherogame.somee.com/api/Accion')
.then(response => response.json())
.then(data => {
  const ul = document.getElementById('acciones');
  data.forEach(accion => {
    const li = document.createElement('li');
    li.classList.add('listacciones');
    li.innerHTML = `<img class="iconmenu" src="svg/Cactus.svg" alt="" > ${accion.nombreAccion} | ${accion.descripcion} | ${accion.dispositivoId} | <a class="acciones editar" href="" data-id="${accion.accionId}">Editar </a><a class="acciones borrar" href="" data-id="${accion.accionId}"> | Borrar</a>`;
    ul.appendChild(li);
  });


     // consulta unica
     document.getElementById('consultarAccion').addEventListener('click', function() {
      const id = document.getElementById('accionById').value; 
      console.log(id)
      fetch(`http://h2oherogame.somee.com/api/Accion/${id}`)
          .then(response => response.json())
          .then(data => {
            console.log(data)
              const resultadoDiv = document.getElementById('resultadoAccion');
              resultadoDiv.innerHTML = `<img class="iconmenu" src="svg/Cactus.svg" alt="" > ${data.nombreAccion} | ${data.descripcion} | ${data.dispositivoId} | <a class="acciones editar" href="" data-id="${data.accionId}">Editar </a><a class="acciones borrar" href="" data-id="${data.accionId}"> | Borrar</a>`;
          })
          .catch(error => {
              alert('Accion no encontrada');
          });
    });


  // Borrar accion
  const borrarLinks = document.querySelectorAll('.borrar');
  borrarLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const id = this.dataset.id;
      fetch(`http://h2oherogame.somee.com/api/Accion/${id}`, {
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


  // crear accion
  document.getElementById('crearAccion').addEventListener('click', function() {
    document.getElementById('crearAccionForm').style.display = 'block';
    document.getElementById('overlay').style.display = 'none';
    });
    const nuevoJugadorForm = document.getElementById('nuevo-accion-form');
    const cancelButton =document.getElementById('cancelAccion');
    cancelButton.addEventListener('click', function() {
    document.getElementById('crearAccionForm').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
    });

    nuevoJugadorForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombreAccion = document.getElementById('nombreAccion').value;
    const descripcion = document.getElementById('descripcion').value;
    const dispositivoId = document.getElementById('dispositivoId').value;

    const response = await fetch(`http://h2oherogame.somee.com/api/Accion?NombreAccion=${nombreAccion}&Descripcion=${descripcion}&DispositivoId=${dispositivoId}`, {
        method: 'POST'
    });

    if (response.status === 200) {
        alert('Accion creada correctamente');
    } else {
        alert('Error al crear la accion');
    }
});


  // editar accion
  document.getElementById('cancelButtonaccion').addEventListener('click', function() {
    document.getElementById('editFormaccion').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
  });
  
  const editarLinks = document.querySelectorAll('.editar');
  editarLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const id = this.dataset.id;
      const accionEncontrado = data.find(accion => accion.accionId == id);
      document.getElementById('editaccionId').value = accionEncontrado.accionId;
      document.getElementById('editnombreAccion').value = accionEncontrado.nombreAccion;
      document.getElementById('editdescripcion').value = accionEncontrado.descripcion;
      document.getElementById('editdispositivoId').value = accionEncontrado.dispositivoId;
      document.getElementById('editFormaccion').style.display = 'block';
    });
  });

  document.getElementById('saveButtonaccion').addEventListener('click', function() {
    const accionId = document.getElementById('editaccionId').value;
    const nombreAccion = document.getElementById('editnombreAccion').value;
    const descripcion = document.getElementById('editdescripcion').value;
    const dispositivoId = document.getElementById('editdispositivoId').value;
    fetch(`http://h2oherogame.somee.com/api/Accion/${accionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        accionId: accionId,
        nombreAccion: nombreAccion,
        descripcion: descripcion,
        dispositivoId: dispositivoId
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
