const BANCO_PREGUNTAS = {
    ingles: [
        { tipo: "radio", pregunta: "1. ¿Cómo se dice 'Hola' en inglés?", opciones: ["Goodbye", "Hello", "Please", "Thanks"], correcta: "Hello" },
        { tipo: "radio", pregunta: "2. ¿Cuál es el pasado del verbo 'eat' (comer)?", opciones: ["Eated", "Ate", "Eaten", "Eating"], correcta: "Ate" },
        { tipo: "radio", pregunta: "3. Elige el pronombre correcto: ___ is my friend.", opciones: ["He", "Him", "His", "Them"], correcta: "He" },
        { tipo: "select", pregunta: "4. Selecciona el artículo correcto: I want ___ apple.", opciones: ["a", "an", "the", "none"], correcta: "an" },
        { tipo: "radio", pregunta: "5. Traduce al inglés: 'Libro'", opciones: ["Table", "Book", "Pen", "Chair"], correcta: "Book" },
        { tipo: "radio", pregunta: "6. ¿Cómo se dice 'Adiós' en inglés?", opciones: ["Hello", "Good morning", "Goodbye", "Good night"], correcta: "Goodbye" },
        { tipo: "radio", pregunta: "7. ¿Cuál de estas palabras es un color?", opciones: ["Apple", "Blue", "Run", "Happy"], correcta: "Blue" },
        { tipo: "checkbox", pregunta: "8. Selecciona las dos vocales de esta lista:", opciones: ["B", "A", "C", "E"], correcta: ["A", "E"] },
        { tipo: "select", pregunta: "9. ¿Cuál es el plural de 'Child' (niño)?", opciones: ["Childs", "Childes", "Children", "Childrens"], correcta: "Children" },
        { tipo: "texto", pregunta: "10. Escribe el número '5' en inglés:", correcta: "five" }
    ],
    mandarin: [
        { tipo: "radio", pregunta: "1. ¿Cómo se dice 'Hola' en mandarín?", opciones: ["Zàijiàn", "Nǐ hǎo", "Xièxie", "Qǐng"], correcta: "Nǐ hǎo" },
        { tipo: "radio", pregunta: "2. ¿Qué significa 'Xièxie'?", opciones: ["Por favor", "Lo siento", "Gracias", "Adiós"], correcta: "Gracias" },
        { tipo: "radio", pregunta: "3. ¿Qué tono tiene la sílaba 'mā' (madre)?", opciones: ["1er tono", "2do tono", "3er tono", "4to tono"], correcta: "1er tono" },
        { tipo: "select", pregunta: "4. ¿Cuál es el Pinyin correcto para 'Agua'?", opciones: ["Huǒ", "Shuǐ", "Tǔ", "Mù"], correcta: "Shuǐ" },
        { tipo: "radio", pregunta: "5. ¿Cómo se dice 'Adiós' en mandarín?", opciones: ["Nǐ hǎo", "Zàijiàn", "Xièxie", "Duìbuqǐ"], correcta: "Zàijiàn" },
        { tipo: "radio", pregunta: "6. ¿Qué significa 'Wǒ'?", opciones: ["Tú", "Él", "Yo", "Nosotros"], correcta: "Yo" },
        { tipo: "radio", pregunta: "7. La palabra 'Běijīng' usa qué tono en 'Běi'?", opciones: ["1er tono", "2do tono", "3er tono", "4to tono"], correcta: "3er tono" },
        { tipo: "checkbox", pregunta: "8. Selecciona los significados correctos de 'Rén':", opciones: ["Persona", "Fuego", "Gente", "Agua"], correcta: ["Persona", "Gente"] },
        { tipo: "select", pregunta: "9. ¿Cuántos tonos principales tiene el mandarín?", opciones: ["2", "3", "4", "5"], correcta: "4" },
        { tipo: "texto", pregunta: "10. Escribe el Pinyin para el número '1' (sin tono):", correcta: "yi" }
    ],
    italiano: [
        { tipo: "radio", pregunta: "1. ¿Cómo se dice 'Hola' en italiano?", opciones: ["Ciao", "Grazie", "Prego", "Scusa"], correcta: "Ciao" },
        { tipo: "radio", pregunta: "2. ¿Qué significa 'Grazie'?", opciones: ["Por favor", "Gracias", "Hola", "Adiós"], correcta: "Gracias" },
        { tipo: "radio", pregunta: "3. Elige el artículo correcto: ___ ragazzo", opciones: ["Il", "La", "Lo", "L'"], correcta: "Il" },
        { tipo: "select", pregunta: "4. Traduce al italiano: 'Manzana'", opciones: ["Mela", "Pera", "Arancia", "Uva"], correcta: "Mela" },
        { tipo: "radio", pregunta: "5. ¿Cómo se conjuga el verbo 'Essere' (Ser) para 'Io' (Yo)?", opciones: ["Sei", "È", "Sono", "Siamo"], correcta: "Sono" },
        { tipo: "radio", pregunta: "6. ¿Qué significa 'Buongiorno'?", opciones: ["Buenas noches", "Buenos días", "Adiós", "Hasta luego"], correcta: "Buenos días" },
        { tipo: "radio", pregunta: "7. ¿Cuál es el plural de 'Libro' en italiano?", opciones: ["Libros", "Libri", "Libre", "Libra"], correcta: "Libri" },
        { tipo: "checkbox", pregunta: "8. Selecciona los dos colores en italiano:", opciones: ["Rosso", "Blu", "Cane", "Gatto"], correcta: ["Rosso", "Blu"] },
        { tipo: "select", pregunta: "9. ¿Cómo se dice 'Adiós' en italiano?", opciones: ["Ciao", "Arrivederci", "Buonasera", "Salve"], correcta: "Arrivederci" },
        { tipo: "texto", pregunta: "10. Escribe el número '3' en italiano:", correcta: "tre" }
    ]
};

let idiomaActual = "";
let idEstudianteActual = null;

async function cargarEvaluacion() {
    const sesion = await verificarSesionActiva();
    if (!sesion) return;

    idiomaActual = sesion.idioma;
    idEstudianteActual = sesion.idEstudiante;
    document.getElementById('nombreEstudiante').textContent = `Estudiante: ${sesion.nombre}`;

    const preguntas = BANCO_PREGUNTAS[idiomaActual];
    const contenedor = document.getElementById('contenedorPreguntas');
    let html = "";

    preguntas.forEach((p, index) => {
        html += `<div class="pregunta-bloque">`;
        html += `<h3>${p.pregunta}</h3>`;

        if (p.tipo === "radio") {
            p.opciones.forEach(op => {
                html += `<label class="opcion"><input type="radio" name="p${index}" value="${op}" required> ${op}</label>`;
            });
        } 
        else if (p.tipo === "checkbox") {
            p.opciones.forEach(op => {
                html += `<label class="opcion"><input type="checkbox" name="p${index}" value="${op}"> ${op}</label>`;
            });
        } 
        else if (p.tipo === "select") {
            html += `<select name="p${index}" class="input-texto-corto" required>
                        <option value="" disabled selected>Selecciona una opción...</option>`;
            p.opciones.forEach(op => {
                html += `<option value="${op}">${op}</option>`;
            });
            html += `</select>`;
        } 
        else if (p.tipo === "texto") {
            html += `<input type="text" name="p${index}" class="input-texto-corto" required placeholder="Escribe tu respuesta aquí...">`;
        }

        html += `</div>`;
    });

    contenedor.innerHTML = html;
}

document.getElementById('formularioEvaluacion').addEventListener('submit', async function(event) {
    event.preventDefault();

    const preguntas = BANCO_PREGUNTAS[idiomaActual];
    let puntaje = 0;
    let respuestasUsuario = {};

    preguntas.forEach((p, index) => {
        let respuestaSeleccionada = "";

        if (p.tipo === "checkbox") {
            const marcados = Array.from(document.querySelectorAll(`input[name="p${index}"]:checked`)).map(cb => cb.value);
            respuestaSeleccionada = marcados.sort().join(", ");
            
            const correctaOrdenada = [...p.correcta].sort().join(", ");
            if (respuestaSeleccionada === correctaOrdenada) {
                puntaje++;
            }
        } 
        else {
            if (p.tipo === "texto") {
                const input = document.querySelector(`input[name="p${index}"]`);
                respuestaSeleccionada = input ? input.value.trim().toLowerCase() : "";
                if (respuestaSeleccionada === p.correcta.toLowerCase()) {
                    puntaje++;
                }
            } else {
                const opcion = document.querySelector(`input[name="p${index}"]:checked`) || document.querySelector(`select[name="p${index}"]`);
                respuestaSeleccionada = opcion ? opcion.value : "";
                if (respuestaSeleccionada === p.correcta) {
                    puntaje++;
                }
            }
        }
        
        respuestasUsuario[`pregunta_${index + 1}`] = respuestaSeleccionada;
    });

    try {
        const aprobado = puntaje >= 6;
        
        await db.evaluaciones.add({
            idEstudiante: idEstudianteActual,
            idioma: idiomaActual,
            respuestas: JSON.stringify(respuestasUsuario),
            calificacion: puntaje,
            aprobado: aprobado,
            fechaEvaluacion: new Date().toLocaleString()
        });

        alert(`Tu calificación es: ${puntaje}/10. ${aprobado ? '¡Felicidades, has aprobado!' : 'No alcanzaste la nota mínima.'}`);
        
        window.location.href = "resultado.html";

    } catch (error) {
        console.error("Error al guardar la evaluación:", error);
        alert("Hubo un error al guardar tu evaluación. Revisa la consola.");
    }
});

document.addEventListener('DOMContentLoaded', cargarEvaluacion);