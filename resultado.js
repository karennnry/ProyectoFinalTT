// js/resultado.js

async function cargarResultados() {
    // 1. Verificar sesión
    const sesion = await verificarSesionActiva();
    if (!sesion) return;

    // 2. Buscamos la evaluación usando el idioma de la sesión (es más seguro)
    const evaluacion = await db.evaluaciones
        .where('idioma').equals(sesion.idioma)
        .reverse()
        .first();

    // Si por alguna razón no la encuentra, mostramos un error
    if (!evaluacion) {
        alert("No se encontró la evaluación. Vuelve a intentarlo.");
        window.location.href = "evaluacion.html";
        return;
    }

    // 3. Mostrar el diploma o el mensaje
    if (evaluacion.aprobado) {
        // Mostrar Diploma
        document.getElementById('contenedorDiploma').style.display = 'block';
        document.getElementById('accionesDiploma').style.display = 'block';
         document.body.classList.add('fondo-diploma'); 
        
        document.getElementById('nombreDiploma').textContent = sesion.nombre;
        document.getElementById('notaDiploma').textContent = evaluacion.calificacion;
        
        // Nombre bonito del curso
        let nombreCurso = "";
        if (evaluacion.idioma === 'ingles') nombreCurso = "Inglés A1";
        if (evaluacion.idioma === 'mandarin') nombreCurso = "Mandarín (Chino Estándar) A1";
        if (evaluacion.idioma === 'italiano') nombreCurso = "Italiano A1";
        
        document.getElementById('cursoDiploma').textContent = nombreCurso;
        document.getElementById('fechaDiploma').textContent = evaluacion.fechaEvaluacion || "Fecha no disponible";

    } else {
        // Mostrar mensaje de reprobado
        document.getElementById('mensajeReprobado').style.display = 'block';
        document.getElementById('notaReprobado').textContent = `${evaluacion.calificacion}/10`;
    }
}

document.addEventListener('DOMContentLoaded', cargarResultados);