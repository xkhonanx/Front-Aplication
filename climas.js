// Listas climas
fetch('http://h2oherogame.somee.com/api/Clima')
.then(response => response.json())
.then(data => {
  const ul = document.getElementById('climas');
  data.forEach(clima => {
    const li = document.createElement('li');
    li.classList.add('listclimas');
    li.innerHTML = `<img class="iconmenu" src="svg/Cactus.svg" alt="" > ${clima.nombreClima} | ${clima.efectoClima} | <a class="acciones editar" href="" data-id="${clima.climaId}">Editar </a><a class="acciones borrar" href="" data-id="${clima.climaId}"> | Borrar</a>`;
    ul.appendChild(li);
  });


     // consulta unica
     document.getElementById('consultarClima').addEventListener('click', function() {
      const id = document.getElementById('climaById').value; 
    
      fetch(`http://h2oherogame.somee.com/api/Clima/${id}`)
          .then(response => response.json())
          .then(data => {
              const resultadoDiv = document.getElementById('resultadoClima');
              resultadoDiv.innerHTML = `<img class="iconmenu" src="svg/Cactus.svg" alt="" > ${data.nombreClima} | ${data.efectoClima} | <a class="acciones editar" href="" data-id="${data.climaId}">Editar </a><a class="acciones borrar" href="" data-id="${data.climaId}"> | Borrar</a>`;
          })
          .catch(error => {
              alert('Clima no encontrado');
          });
    });


  // Borrar climas
  const borrarLinks = document.querySelectorAll('.borrar');
  borrarLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const id = this.dataset.id;
      fetch(`http://h2oherogame.somee.com/api/Clima/${id}`, {
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

     // crear climas
     document.getElementById('crearClima').addEventListener('click', function() {
      document.getElementById('crearClimaForm').style.display = 'block';
      document.getElementById('overlay').style.display = 'none';
      });
      const nuevoClimaForm = document.getElementById('nuevo-clima-form');
      const cancelButton =document.getElementById('cancelClima');
      cancelButton.addEventListener('click', function() {
      document.getElementById('crearClimaForm').style.display = 'none';
      document.getElementById('overlay').style.display = 'none';
      });

      nuevoClimaForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nombreClima = document.getElementById('creanombreClima').value;
      const efectoClima = document.getElementById('creaefectoClima').value;

      const response = await fetch(`http://h2oherogame.somee.com/api/Clima?NombreClima=${nombreClima}&EfectoClima=${efectoClima}`, {
          method: 'POST'
      });

      if (response.status === 200) {
          alert('Clima creado correctamente');
      } else {
          alert('Error al crear el Clima');
      }
  });


  // editar climas
  document.getElementById('cancelButtonclima').addEventListener('click', function() {
    document.getElementById('editFormclima').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
    });
    const editarLinks = document.querySelectorAll('.editar');
    editarLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const id = this.dataset.id;
        const climaEncontrado = data.find(clima => clima.climaId == id);
        document.getElementById('editclimaId').value = climaEncontrado.climaId;
        document.getElementById('editnombreClima').value = climaEncontrado.nombreClima;
        document.getElementById('editefectoClima').value = climaEncontrado.efectoClima;
        document.getElementById('editFormclima').style.display = 'block';
    });
        });

document.getElementById('saveButtonclima').addEventListener('click', function() {
  const climaId = document.getElementById('editclimaId').value;
  const nombreClima = document.getElementById('editnombreClima').value;
  const efectoClima = document.getElementById('editefectoClima').value;
    fetch(`http://h2oherogame.somee.com/api/Clima/${climaId}`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        climaId: climaId,
        nombreClima: nombreClima,
        efectoClima: efectoClima
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
