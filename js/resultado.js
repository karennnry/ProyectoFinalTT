async function cargarResultados() {
    const sesion = await verificarSesionActiva();
    if (!sesion) return;

    const evaluacion = await db.evaluaciones
        .where('idioma').equals(sesion.idioma)
        .reverse()
        .first();

    if (!evaluacion) {
        alert("No se encontró la evaluación. Vuelve a intentarlo.");
        window.location.href = "evaluacion.html";
        return;
    }

    if (evaluacion.aprobado) {
        document.getElementById('contenedorDiploma').style.display = 'block';
        document.getElementById('accionesDiploma').style.display = 'block';
         document.body.classList.add('fondo-diploma'); 
        
        document.getElementById('nombreDiploma').textContent = sesion.nombre;
        document.getElementById('notaDiploma').textContent = evaluacion.calificacion;
        
        let nombreCurso = "";
        if (evaluacion.idioma === 'ingles') nombreCurso = "Inglés A1";
        if (evaluacion.idioma === 'mandarin') nombreCurso = "Mandarín (Chino Estándar) A1";
        if (evaluacion.idioma === 'italiano') nombreCurso = "Italiano A1";
        
        document.getElementById('cursoDiploma').textContent = nombreCurso;
        document.getElementById('fechaDiploma').textContent = evaluacion.fechaEvaluacion || "Fecha no disponible";

    } else {
        document.getElementById('mensajeReprobado').style.display = 'block';
        document.getElementById('notaReprobado').textContent = `${evaluacion.calificacion}/10`;
    }
}

document.addEventListener('DOMContentLoaded', cargarResultados);