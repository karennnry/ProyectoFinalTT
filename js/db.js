const db = new Dexie("AcademiaTalkaTiveDB");

db.version(1).stores({
    estudiantes: '++id, nombre, email, idioma, fechaRegistro',
    evaluaciones: '++id, idEstudiante, idioma, calificacion, aprobado, fechaEvaluacion',
    sesion: 'id' 
});

async function iniciarSesion(estudiante) {
    await db.sesion.put({
        id: 1,
        idEstudiante: estudiante.id,
        nombre: estudiante.nombre,
        idioma: estudiante.idioma
    });
}

async function obtenerSesion() {
    return await db.sesion.get(1);
}

async function cerrarSesion() {
    await db.sesion.clear();
    window.location.href = "index.html";
}

async function verificarSesionActiva() {
    const sesion = await obtenerSesion();
    if (!sesion) {
        alert("Debes registrarte para acceder a esta página.");
        window.location.href = "registro.html";
        return null;
    }
    return sesion;
}