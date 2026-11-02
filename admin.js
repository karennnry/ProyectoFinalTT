// js/admin.js

// 1. Lógica del Login
document.getElementById('formularioLogin').addEventListener('submit', function(event) {
    event.preventDefault();

    const usuario = document.getElementById('usuario').value.trim();
    const password = document.getElementById('password').value.trim();

    // Validación de credenciales
    if (usuario === "admin" && password === "2026") {
        // Ocultar login y mostrar panel
        document.getElementById('pantallaLogin').style.display = 'none';
        document.getElementById('panelAdmin').style.display = 'block';
        
        // Cargar los datos
        cargarDatosAdmin();
    } else {
        alert("❌ Usuario o contraseña incorrectos. Intenta de nuevo.");
    }
});

// 2. Función para cargar los datos en la tabla
async function cargarDatosAdmin() {
    const cuerpoTabla = document.getElementById('cuerpoTabla');
    cuerpoTabla.innerHTML = ""; // Limpiamos la tabla por si acaso

    try {
        // Traer todos los estudiantes y todas las evaluaciones
        const estudiantes = await db.estudiantes.toArray();
        const evaluaciones = await db.evaluaciones.toArray();

        // Actualizar contadores
        document.getElementById('totalEstudiantes').textContent = estudiantes.length;
        document.getElementById('totalEvaluaciones').textContent = evaluaciones.length;

        if (evaluaciones.length === 0) {
            cuerpoTabla.innerHTML = `<tr><td colspan="5" style="text-align: center;">No hay evaluaciones registradas aún.</td></tr>`;
            return;
        }

        // Recorrer las evaluaciones
        evaluaciones.forEach(eval => {
            // Buscar el nombre del estudiante en el arreglo de estudiantes
            const estudiante = estudiantes.find(est => est.id === eval.idEstudiante);
            const nombreEstudiante = estudiante ? estudiante.nombre : "Desconocido";

            // Formatear el idioma
            let idiomaBonito = eval.idioma;
            if (idiomaBonito === 'ingles') idiomaBonito = 'Inglés';
            if (idiomaBonito === 'mandarin') idiomaBonito = 'Mandarín';
            if (idiomaBonito === 'italiano') idiomaBonito = 'Italiano';

            // Determinar el badge de estado
            const estadoHTML = eval.aprobado 
                ? `<span class="badge-aprobado">Aprobado</span>` 
                : `<span class="badge-reprobado">Reprobado</span>`;

            // Crear la fila
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

// 3. Función para cerrar sesión de admin
function cerrarSesionAdmin() {
    // En lugar de redirigir, solo recargamos la página para volver al login
    // (No tocamos la sesión del estudiante porque esto es un panel aparte)
    window.location.reload(); 
}

// 4. Función para borrar la base de datos (con confirmación)
async function borrarBaseDeDatos() {
    const confirmacion = confirm("⚠️ ¿Estás seguro de que quieres borrar TODOS los estudiantes y evaluaciones? Esta acción no se puede deshacer.");
    
    if (confirmacion) {
        try {
            await db.estudiantes.clear();
            await db.evaluaciones.clear();
            await db.sesion.clear();
            alert("✅ Base de datos vaciada con éxito.");
            window.location.reload(); // Recargar para ver la tabla vacía
        } catch (error) {
            console.error("Error al borrar la base de datos:", error);
            alert("Hubo un error al intentar borrar los datos.");
        }
    }
}