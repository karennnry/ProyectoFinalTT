document.getElementById('formularioLogin').addEventListener('submit', function(event) {
    event.preventDefault();

    const usuario = document.getElementById('usuario').value.trim();
    const password = document.getElementById('password').value.trim();

    if (usuario === "admin" && password === "2026") {
        document.getElementById('pantallaLogin').style.display = 'none';
        document.getElementById('panelAdmin').style.display = 'block';
        
        cargarDatosAdmin();
    } else {
        alert("❌ Usuario o contraseña incorrectos. Intenta de nuevo.");
    }
});

async function cargarDatosAdmin() {
    const cuerpoTabla = document.getElementById('cuerpoTabla');
    cuerpoTabla.innerHTML = "";

    try {
        const estudiantes = await db.estudiantes.toArray();
        const evaluaciones = await db.evaluaciones.toArray();

        document.getElementById('totalEstudiantes').textContent = estudiantes.length;
        document.getElementById('totalEvaluaciones').textContent = evaluaciones.length;

        if (evaluaciones.length === 0) {
            cuerpoTabla.innerHTML = `<tr><td colspan="5" style="text-align: center;">No hay evaluaciones registradas aún.</td></tr>`;
            return;
        }

        evaluaciones.forEach(eval => {
            const estudiante = estudiantes.find(est => est.id === eval.idEstudiante);
            const nombreEstudiante = estudiante ? estudiante.nombre : "Desconocido";

            let idiomaBonito = eval.idioma;
            if (idiomaBonito === 'ingles') idiomaBonito = 'Inglés';
            if (idiomaBonito === 'mandarin') idiomaBonito = 'Mandarín';
            if (idiomaBonito === 'italiano') idiomaBonito = 'Italiano';

            const estadoHTML = eval.aprobado 
                ? `<span class="badge-aprobado">Aprobado</span>` 
                : `<span class="badge-reprobado">Reprobado</span>`;

            const fila = `
                <tr>
                    <td>#${eval.idEstudiante}</td>
                    <td>${nombreEstudiante}</td>
                    <td>${idiomaBonito}</td>
                    <td><strong>${eval.calificacion}/10</strong></td>
                    <td>${estadoHTML}</td>
                </tr>
            `;
            cuerpoTabla.innerHTML += fila;
        });

    } catch (error) {
        console.error("Error al cargar datos de admin:", error);
        alert("Hubo un error al cargar los datos.");
    }
}

function cerrarSesionAdmin() {
    window.location.reload(); 
}

async function borrarBaseDeDatos() {
    const confirmacion = confirm("⚠️ ¿Estás seguro de que quieres borrar TODOS los estudiantes y evaluaciones? Esta acción no se puede deshacer.");
    
    if (confirmacion) {
        try {
            await db.estudiantes.clear();
            await db.evaluaciones.clear();
            await db.sesion.clear();
            alert("✅ Base de datos vaciada con éxito.");
            window.location.reload();
        } catch (error) {
            console.error("Error al borrar la base de datos:", error);
            alert("Hubo un error al intentar borrar los datos.");
        }
    }
}