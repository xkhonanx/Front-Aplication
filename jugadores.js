 // Listas jugadores
 fetch('http://h2oherogame.somee.com/api/Jugador')
 .then(response => response.json())
 .then(data => {
   const ul = document.getElementById('jugadores');
   data.forEach(jugador => {
     const li = document.createElement('li');
     li.classList.add('listusers');
     li.innerHTML = `<img class="iconmenu" src="svg/Cactus.svg" alt="" > ${jugador.nombreUsuario} | ${jugador.nombres} | ${jugador.apellidos} | ${jugador.email} | <a class="acciones editar" href="" data-id="${jugador.jugadorId}">Editar </a> <a class="acciones borrar" href="" data-id="${jugador.jugadorId}"> | Borrar</a>`;
     ul.appendChild(li);
   });

   // consulta unica
    document.getElementById('consultarJugador').addEventListener('click', function() {
      const id = document.getElementById('jugadorById').value; 
    
      fetch(`http://h2oherogame.somee.com/api/Jugador/${id}`)
          .then(response => response.json())
          .then(data => {
              const resultadoDiv = document.getElementById('resultado');
              resultadoDiv.innerHTML = `<img class="iconmenu" src="svg/Cactus.svg" alt="" > ${data.nombreUsuario} | ${data.nombres} | ${data.apellidos} | ${data.email} | <a class="acciones editar" href="" data-id="${data.jugadorId}">Editar </a> <a class="acciones borrar" href="" data-id="${data.jugadorId}"> | Borrar</a>`;
          })
          .catch(error => {
              alert('Jugador no encontrado');
          });
    });


   // Borrar jugadores
   const borrarLinks = document.querySelectorAll('.borrar');
   borrarLinks.forEach(link => {
     link.addEventListener('click', function(e) {
       e.preventDefault();
       const id = this.dataset.id;
       fetch(`http://h2oherogame.somee.com/api/Jugador/${id}`, {
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
        document.getElementById('crearJugador').addEventListener('click', function() {
        document.getElementById('crearForm').style.display = 'block';
        document.getElementById('overlay').style.display = 'none';
        });
        const nuevoJugadorForm = document.getElementById('nuevo-jugador-form');
        const cancelButton =document.getElementById('cancel');
        cancelButton.addEventListener('click', function() {
        document.getElementById('crearForm').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
        });

        nuevoJugadorForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nombres = document.getElementById('creaNombres').value;
        const apellidos = document.getElementById('creaApellidos').value;
        const nombreUsuario = document.getElementById('creaNombreUsuario').value;
        const password = document.getElementById('creaPassword').value;
        const photo = document.getElementById('creaPhoto').value;
        const email = document.getElementById('creaEmail').value;

        const response = await fetch(`http://h2oherogame.somee.com/api/Jugador?Nombres=${nombres}&Apellidos=${apellidos}&NombreUsuario=${nombreUsuario}&password=${password}&photo=${photo}&Email=${email}`, {
            method: 'POST'
        });

        if (response.status === 200) {
            alert('Jugador creado correctamente');
        } else {
            alert('Error al crear el jugador');
        }
    });

   // editar jugadores
    document.getElementById('cancelButton').addEventListener('click', function() {
    document.getElementById('editForm').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
    });
    const editarLinks = document.querySelectorAll('.editar');
    editarLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const id = this.dataset.id;
        const jugador = data.find(jugador => jugador.jugadorId == id);
        document.getElementById('editId').value = jugador.jugadorId;
        document.getElementById('editNombreUsuario').value = jugador.nombreUsuario;
        document.getElementById('editNombres').value = jugador.nombres;
        document.getElementById('editApellidos').value = jugador.apellidos;
        document.getElementById('editEmail').value = jugador.email;
        document.getElementById('editPassword').value = jugador.password;
        document.getElementById('editPhoto').value = jugador.photo;
        document.getElementById('editForm').style.display = 'block';
    });
        });

document.getElementById('saveButton').addEventListener('click', function() {
  const id = document.getElementById('editId').value;
  const nombreUsuario = document.getElementById('editNombreUsuario').value;
  const nombres = document.getElementById('editNombres').value;
  const apellidos = document.getElementById('editApellidos').value;
  const email = document.getElementById('editEmail').value;
  const password = document.getElementById('editPassword').value;
  const photo = document.getElementById('editPhoto').value;
    fetch(`http://h2oherogame.somee.com/api/Jugador/${id}`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        jugadorId: id,
        nombreUsuario: nombreUsuario,
        nombres: nombres,
        apellidos: apellidos,
        email: email,
        password: password,
        photo: photo
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
