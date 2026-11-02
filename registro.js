// js/registro.js

document.getElementById('formularioRegistro').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evitamos que la página se recargue

    // 1. Capturamos los datos
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const idioma = document.getElementById('idioma').value;

    // Validación básica extra (por si acaso)
    if (nombre === "" || email === "" || telefono === "" || idioma === "") {
        alert("Por favor, llena todos los campos.");
        return;
    }

    try {
        // 2. Guardamos al estudiante en la base de datos
        // El método .add() nos devuelve el ID recién creado
        const nuevoId = await db.estudiantes.add({
            nombre: nombre,
            email: email,
            telefono: telefono,
            idioma: idioma,
            fechaRegistro: new Date().toLocaleString()
        });

        // 3. Creamos la sesión activa (usando la función de nuestro db.js)
        // Le pasamos un objeto con los datos necesarios para la sesión
        await iniciarSesion({
            id: nuevoId,
            nombre: nombre,
            idioma: idioma
        });

        // 4. Redirigimos al curso
        alert(`¡Bienvenido/a, ${nombre}! Tu registro fue exitoso.`);
        window.location.href = "curso.html";

    } catch (error) {
        console.error("Error al registrar:", error);
        alert("Hubo un problema al guardar tus datos. Revisa la consola (F12).");
    }
});