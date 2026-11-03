// js/curso.js

// 🆕 Datos extra para cada idioma (Orientados a la evaluación)
const VOCAB = {
    ingles: [
        ["Hello", "Hola"], 
        ["Ate", "Pasado de comer"], 
        ["Pink", "Rosado"], 
        ["Book", "Libro"], 
        ["Children", "Niños (plural)"], 
        ["Blue", "Azul"],
        ["Apple", "Manzana"],
        ["Teacher", "Profesor / Maestro"]
    ],
    mandarin: [
        ["Nǐ hǎo", "Hola"], 
        ["Xièxie", "Gracias"], 
        ["Zàijiàn", "Adiós"], 
        ["Shuǐ", "Agua"], 
        ["Wǒ", "Yo"], 
        ["Rén", "Persona / Gente"],
        ["Jīn", "Oro"],
        ["Lǎoshī", "Profesor"]
    ],
    italiano: [
        ["Ciao", "Hola / Adiós"], 
        ["Grazie", "Gracias"], 
        ["Il", "El (artículo)"], 
        ["Mela", "Manzana"], 
        ["Sono", "Yo soy"], 
        ["Libri", "Libros"],
        ["Amico", "Amigo"],
        ["Cinque", "Cinco"]
    ]
};

const SEMANAS = [
    ["Semana 1: Saludos y presentaciones", "Aprenderás a saludar, despedirte y decir tu nombre."],
    ["Semana 2: Números, días y colores", "Contar, decir la fecha y describir lo que ves."],
    ["Semana 3: Familia y rutina diaria", "Hablar de las personas cercanas y de tu día a día."],
    ["Semana 4: Conversaciones cotidianas", "Practicar diálogos reales y repasar todo lo aprendido."]
];

const TAREAS = ["Ver el video de la lección", "Leer el material de lectura", "Repasar el vocabulario", "Practicar con el enlace externo"];

// 🆕 Construye las secciones adicionales (Incluye el efecto cortina)
function extrasHtml(idioma) {
    const tarjetas = VOCAB[idioma].map(p =>
        `<div class="vocab">
            <div class="content">${p[1]}</div>
            <div class="mask-wrap">
                <div class="mask mask-left">${p[0]}</div>
                <div class="mask mask-right">${p[0]}</div>
            </div>
        </div>`
    ).join("");

    const plan = SEMANAS.map(s =>
        `<details><summary>${s[0]}</summary><p>${s[1]}</p></details>`
    ).join("");

    const tareas = TAREAS.map((t, index) =>
        `<input type="checkbox" id="tarea-${index}" />
         <label for="tarea-${index}">${t}</label>`
    ).join("");

    return `
        <h3>🧠 Vocabulario clave</h3>
        <p>Pasa el cursor sobre las palabras para ver su significado.</p> <!-- Texto actualizado -->
        <div class="vocab-grid">${tarjetas}</div>

        <h3>🗓️ Plan de 4 semanas</h3>
        <div class="plan">${plan}</div>

        <h3>✅ Tu progreso</h3>
        <p>Marca lo que ya hiciste en esta lección.</p>
        <div id="checklist">${tareas}</div>
    `;
}

// 🆕 Barra de progreso (se guarda en el navegador)
function iniciarProgreso(idioma) {
    const clave = 'progreso_' + idioma;
    let guardado = [];
    try { guardado = JSON.parse(localStorage.getItem(clave)) || []; } catch (e) {}

    const cajas = document.querySelectorAll('#checklist input[type="checkbox"]');
    const barra = document.getElementById('barraProgreso');
    const texto = document.getElementById('textoProgreso');

    function actualizar() {
        const hechas = [...cajas].filter(c => c.checked).length;
        const pct = Math.round(hechas / cajas.length * 100);
        barra.style.width = pct + '%';
        texto.textContent = 'Progreso: ' + pct + '%';
        try { localStorage.setItem(clave, JSON.stringify([...cajas].map(c => c.checked))); } catch (e) {}
    }

    cajas.forEach((c, i) => {
        c.checked = !!guardado[i];
        c.addEventListener('change', actualizar);
    });
    actualizar();
}

// 1. Iniciar la página
async function cargarCurso() {
    const sesion = await verificarSesionActiva();
    if (!sesion) return;

    document.getElementById('nombreEstudiante').textContent = `Hola, ${sesion.nombre}`;

    const tituloCurso = document.getElementById('tituloCurso');
    const contenido = document.getElementById('contenidoDinamico');

    let htmlContenido = "";

    if (sesion.idioma === 'ingles') {
        tituloCurso.textContent = "🌍 Curso de Inglés";
        htmlContenido = `
            <h2>Módulo 1: Introducción al Inglés</h2>
            <p>¡Bienvenido al inglés! En este módulo aprenderás los saludos básicos, el alfabeto y cómo presentarte.</p>
            
            <h3>🎥 Video Lección 1: Saludos en Inglés</h3>
            <div class="video-responsive">
                <iframe width="560" height="315" 
src="https://www.youtube.com/embed/LPbAIh3bcIE?si=33jbw45et9nicGoh" 
title="YouTube video player" 
frameborder="0" 
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
</iframe>
            </div>

            <h3>📚 Material de Lectura</h3>
            <p>El verbo <strong>To Be</strong> (ser/estar) es el más importante. Se conjuga así: I am, You are, He/She/It is, We are, They are.</p>
            
            <img src="images/usa2.jpg" alt="Ilustración de saludos en inglés" style="width:100%; border-radius: 8px; margin-top: 10px;" onerror="this.src='https://via.placeholder.com/800x400?text=Imagen+de+Ingles'">
            <p>Puedes practicar más en este <a href="https://www.duolingo.com/" target="_blank" class="enlace-externo">hipervínculo a Duolingo</a>.</p>
        `;
    } 
    else if (sesion.idioma === 'mandarin') {
        tituloCurso.textContent = "🏮 Curso de Mandarín (Chino Estándar)";
        htmlContenido = `
            <h2>Módulo 1: Pinyin y Tonos</h2>
            <p>El mandarín es un idioma tonal. El significado de una palabra cambia según el tono con el que la pronuncies.</p>
            
            <h3>🎥 Video Lección 1: Introducción al Pinyin</h3>
            <div class="video-responsive">
                <iframe 
                src="https://www.youtube.com/embed/lO3bifZoTr0?si=qPDEEfx_o0S2Z-Si" 
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerpolicy="strict-origin-when-cross-origin" 
                allowfullscreen>
</iframe>
            </div>

            <h3>📚 Material de Lectura</h3>
            <p>Los 4 tonos principales son:</p>
            <ul>
                <li>1er tono: Alto y plano (mā)</li>
                <li>2do tono: Ascendente (má)</li>
                <li>3er tono: Descendente y luego ascendente (mǎ)</li>
                <li>4to tono: Descendente y cortante (mà)</li>
            </ul>         
            
            <img src="images/china1.png" alt="Caracteres chinos" style="width:100%; border-radius: 8px; margin-top: 10px;" onerror="this.src='https://via.placeholder.com/800x400?text=Imagen+de+Mandarín'">
            <p>Aprende tips para aprender más rápido en este <a href="https://clicasia.com/4-trucos-para-aprender-chino-mas-rapido-2/" target="_blank" class="enlace-externo">enlace externo</a>.</p>
        `;
    } 
    else if (sesion.idioma === 'italiano') {
        tituloCurso.textContent = "🍝 Curso de Italiano";
        htmlContenido = `
            <h2>Módulo 1: Pronunciación y Saludos</h2>
            <p>El italiano es un idioma muy fonético: se lee tal como se escribe. ¡Es ideal para hispanohablantes!</p>
            
            <h3>🎥 Video Lección 1: Saludos y Frases Básicas</h3>
            <div class="video-responsive">
                <iframe width="560" height="315" 
src="https://www.youtube.com/embed/ZKZZc40p5kg?si=ZKqOcD3mQaPsmbw2" 
title="YouTube video player" 
frameborder="0" 
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
</iframe>
            </div>

            <h3>📚 Material de Lectura</h3>
            <p>Saludos básicos:</p>
            <ul>
                <li><strong>Ciao</strong> (Hola/Adiós)</li>
                <li><strong>Buongiorno</strong> (Buenos días)</li>
                <li><strong>Buonasera</strong> (Buenas tardes/noches)</li>
                <li><strong>Grazie</strong> (Gracias)</li>
            </ul>
                        
            <img src="images/italia3.jpg" alt="Paisaje italiano" style="width:100%; border-radius: 8px; margin-top: 10px;" onerror="this.src='https://via.placeholder.com/800x400?text=Imagen+de+Italiano'">
            <p>Explora la cultura italiana en este <a href="https://www.italia.it/es" target="_blank" class="enlace-externo">hipervínculo a Italia.it</a>.</p>
        `;
    }

    if (VOCAB[sesion.idioma]) {
        htmlContenido += extrasHtml(sesion.idioma);
    }

    contenido.innerHTML = htmlContenido;

    if (VOCAB[sesion.idioma]) {
        iniciarProgreso(sesion.idioma);
    }
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', cargarCurso);