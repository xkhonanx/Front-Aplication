// Listas granja
fetch('http://h2oherogame.somee.com/api/Granja')
.then(response => response.json())
.then(data => {
  const ul = document.getElementById('granjas');
  data.forEach(granja => {
    const li = document.createElement('li');
    li.classList.add('listgranjas');
    li.innerHTML = `<img class="iconmenu" src="svg/Cactus.svg" alt="" > ${granja.nombreGranja} | ${granja.cultivoId} | ${granja.climaId} | ${granja.sistemaRiego} | ${granja.dificultad} | <a class="acciones editar" href="" data-id="${granja.granjaId}">Editar </a><a class="acciones borrar" href="" data-id="${granja.granjaId}"> | Borrar</a>`;
    ul.appendChild(li);
  });


     // consulta unica
     document.getElementById('consultarGranja').addEventListener('click', function() {
      const id = document.getElementById('granjaById').value; 
    
      fetch(`http://h2oherogame.somee.com/api/Granja/${id}`)
          .then(response => response.json())
          .then(data => {
              const resultadoDiv = document.getElementById('resultadoGranja');
              resultadoDiv.innerHTML = `<img class="iconmenu" src="svg/Cactus.svg" alt="" > ${data.nombreGranja} | ${data.cultivoId} | ${data.climaId} | ${data.sistemaRiego} | ${data.dificultad} | <a class="acciones editar" href="" data-id="${data.granjaId}">Editar </a><a class="acciones borrar" href="" data-id="${data.granjaId}"> | Borrar</a>`;
          })
          .catch(error => {
              alert('Granja no encontrado');
          });
    });


  // Borrar granja
  const borrarLinks = document.querySelectorAll('.borrar');
  borrarLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const id = this.dataset.id;
      fetch(`http://h2oherogame.somee.com/api/Granja/${id}`, {
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
     document.getElementById('crearGranja').addEventListener('click', function() {
      document.getElementById('crearGranjaForm').style.display = 'block';
      document.getElementById('overlay').style.display = 'none';
      });
      const nuevoGranjaForm = document.getElementById('nuevo-granja-form');
      const cancelButton =document.getElementById('cancelGranja');
      cancelButton.addEventListener('click', function() {
      document.getElementById('crearGranjaForm').style.display = 'none';
      document.getElementById('overlay').style.display = 'none';
      });

      nuevoGranjaForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nombreGranja = document.getElementById('creanombreGranja').value;
      const cultivoId = document.getElementById('creacultivoId').value;
      const climaId = document.getElementById('creaclimaId').value;
      const sistemaRiego = document.getElementById('creasistemaRiego').value;
      const dificultad = document.getElementById('creadificultad').value;

      const response = await fetch(`http://h2oherogame.somee.com/api/Granja?NombreGranja=${nombreGranja}&CultivoId=${cultivoId}&ClimaId=${climaId}&SistemaRiego=${sistemaRiego}&Dificultad=${dificultad}`, {
          method: 'POST'
      });

      if (response.status === 200) {
          alert('Granja creada correctamente');
      } else {
          alert('Error al crear la granja');
      }
  });


  // editar granja
  document.getElementById('cancelButtongranja').addEventListener('click', function() {
    document.getElementById('editFormgranja').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
  });
  
  const editarLinks = document.querySelectorAll('.editar');
  editarLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const id = this.dataset.id;
      const granjaEncontrada = data.find(granja => granja.granjaId == id);
      document.getElementById('editgranjaId').value = granjaEncontrada.granjaId;
      document.getElementById('editnombreGranja').value = granjaEncontrada.nombreGranja;
      document.getElementById('editcultivoId').value = granjaEncontrada.cultivoId;
      document.getElementById('editclimaId').value = granjaEncontrada.climaId;
      document.getElementById('editsistemaRiego').value = granjaEncontrada.sistemaRiego;
      document.getElementById('editdificultad').value = granjaEncontrada.dificultad;
      document.getElementById('editFormgranja').style.display = 'block';
    });
  });

  document.getElementById('saveButtongranja').addEventListener('click', function() {
    const granjaId = document.getElementById('editgranjaId').value;
    const nombreGranja = document.getElementById('editnombreGranja').value;
    const cultivoId = document.getElementById('editcultivoId').value;
    const climaId = document.getElementById('editclimaId').value;
    const sistemaRiego = document.getElementById('editsistemaRiego').value;
    const dificultad = document.getElementById('editdificultad').value;
    fetch(`http://h2oherogame.somee.com/api/Granja/${granjaId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        granjaId: granjaId,
        nombreGranja: nombreGranja,
        cultivoId: cultivoId,
        climaId: climaId,
        sistemaRiego: sistemaRiego,
        dificultad: dificultad
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
