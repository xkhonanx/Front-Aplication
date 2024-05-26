// Listas cultivo
fetch('http://h2oherogame.somee.com/api/Cultivo')
.then(response => response.json())
.then(data => {
  const ul = document.getElementById('cultivos');
  data.forEach(cultivo => {
    const li = document.createElement('li');
    li.classList.add('listcultivos');
    li.innerHTML = `<img class="iconmenu" src="svg/Cactus.svg" alt="" > ${cultivo.cultivoNombre} | ${cultivo.nivelAgua} | ${cultivo.estado} | <a class="acciones editar" href="" data-id="${cultivo.cultivoId}">Editar </a><a class="acciones borrar" href="" data-id="${cultivo.cultivoId}"> | Borrar</a>`;
    ul.appendChild(li);
  });


  document.getElementById('consultarCultivo').addEventListener('click', function() {
    const id = document.getElementById('cultivoById').value; 
  
    fetch(`http://h2oherogame.somee.com/api/Cultivo/${id}`)
        .then(response => response.json())
        .then(data => {
            const resultadoDiv = document.getElementById('resultadoCultivo');
            resultadoDiv.innerHTML = `<img class="iconmenu" src="svg/Cactus.svg" alt="" > ${data.cultivoNombre} | ${data.nivelAgua} | ${data.estado} | <a class="acciones editar" href="" data-id="${data.cultivoId}">Editar </a><a class="acciones borrar" href="" data-id="${data.cultivoId}"> | Borrar</a>`;
        })
        .catch(error => {
            alert('Cultivo no encontrado');
        });
  });


  // Borrar cultivo
  const borrarLinks = document.querySelectorAll('.borrar');
  borrarLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const id = this.dataset.id;
      fetch(`http://h2oherogame.somee.com/api/Cultivo/${id}`, {
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
     document.getElementById('crearCultivo').addEventListener('click', function() {
      document.getElementById('crearCultivoForm').style.display = 'block';
      document.getElementById('overlay').style.display = 'none';
      });
      const nuevoJugadorForm = document.getElementById('nuevo-cultivo-form');
      const cancelButton =document.getElementById('cancelCultivo');
      cancelButton.addEventListener('click', function() {
      document.getElementById('crearCultivoForm').style.display = 'none';
      document.getElementById('overlay').style.display = 'none';
      });

      nuevoJugadorForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const cultivoNombre = document.getElementById('cultivoNombre').value;
      const nivelAgua = document.getElementById('nivelAgua').value;
      const estado = document.getElementById('estado').value;
      const dispositivoId = document.getElementById('dispositivoId').value;

      const response = await fetch(`http://h2oherogame.somee.com/api/Cultivo?CultivoNombre=${cultivoNombre}&Estado=${estado}&NivelAgua=${nivelAgua}&DispositivoId=${dispositivoId}`, {
          method: 'POST'
      });

      if (response.status === 200) {
          alert('Cultivo creado correctamente');
      } else {
          alert('Error al crear el Cultivo');
      }
  });


  // editar cultivo
  document.getElementById('cancelButtoncultivo').addEventListener('click', function() {
    document.getElementById('editFormcultivo').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
  });
  
  const editarLinks = document.querySelectorAll('.editar');
  editarLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const id = this.dataset.id;
      const cultivoEncontrado = data.find(cultivo => cultivo.cultivoId == id);
      document.getElementById('editcultivoId').value = cultivoEncontrado.cultivoId;
      document.getElementById('editcultivoNombre').value = cultivoEncontrado.cultivoNombre;
      document.getElementById('editnivelAgua').value = cultivoEncontrado.nivelAgua;
      document.getElementById('editestado').value = cultivoEncontrado.estado;
      document.getElementById('editFormcultivo').style.display = 'block';
    });
  });

  document.getElementById('saveButtoncultivo').addEventListener('click', function() {
    const cultivoId = document.getElementById('editcultivoId').value;
    const cultivoNombre = document.getElementById('editcultivoNombre').value;
    const nivelAgua = document.getElementById('editnivelAgua').value;
    const estado = document.getElementById('editestado').value;
    fetch(`http://h2oherogame.somee.com/api/Cultivo/${cultivoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cultivoId: cultivoId,
        cultivoNombre: cultivoNombre,
        nivelAgua: nivelAgua,
        estado: estado
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
