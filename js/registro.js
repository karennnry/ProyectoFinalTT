document.getElementById('formularioRegistro').addEventListener('submit', async function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const idioma = document.getElementById('idioma').value;

    if (nombre === "" || email === "" || telefono === "" || idioma === "") {
        alert("Por favor, llena todos los campos.");
        return;
    }

    try {
        const nuevoId = await db.estudiantes.add({
            nombre: nombre,
            email: email,
            telefono: telefono,
            idioma: idioma,
            fechaRegistro: new Date().toLocaleString()
        });

        await iniciarSesion({
            id: nuevoId,
            nombre: nombre,
            idioma: idioma
        });

        alert(`¡Bienvenido/a, ${nombre}! Tu registro fue exitoso.`);
        window.location.href = "curso.html";

    } catch (error) {
        console.error("Error al registrar:", error);
        alert("Hubo un problema al guardar tus datos. Revisa la consola (F12).");
    }
});