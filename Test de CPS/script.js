const clickArea = document.getElementById('click-area');
const clickCount = document.getElementById('click-count');
const cpsResult = document.getElementById('cps-result');

let clicks = 0;
let timer;
let isTesting = false;

clickArea.addEventListener('click', () => {
    if (!isTesting) {
        startTest();
    } else {
        clicks++;
        clickCount.textContent = clicks;
    }
});

function startTest() {
    clicks = 1;
    isTesting = true;
    clickCount.textContent = clicks;
    clickArea.textContent = "¡Sigue haciendo clic!";
    
    timer = setTimeout(() => {
        endTest();
    }, 5000); // 5 segundos
}

function endTest() {
    isTesting = false;
    const cps = (clicks / 5).toFixed(1);
    cpsResult.textContent = cps;
    clickArea.textContent = "¡Prueba terminada! Haz clic en 'Volver a Jugar' para intentarlo de nuevo.";
    
    // Calcular nivel (1-15)
    const level = Math.min(Math.max(Math.floor(cps), 1), 15);
    
    // Ocultar todas las imágenes de nivel
    document.querySelectorAll('.level-image').forEach(img => {
        img.style.display = 'none';
    });
    
    // Mostrar placeholder por defecto
    document.querySelector('.default-placeholder').style.display = 'flex';
    
    // Mostrar imagen correspondiente al nivel si existe
    const levelImage = document.querySelector(`.level-image[data-level="${level}"]`);
    if (levelImage) {
        document.querySelector('.default-placeholder').style.display = 'none';
        levelImage.style.display = 'block';
        
        // Actualizar texto descriptivo
        const messages = [
            "¡Sigue practicando!",    // Nivel 1
            "¡Buen comienzo!",        // Nivel 2
            // ... mensajes para cada nivel
            "¡Leyenda del CPS!"      // Nivel 15
        ];
        document.getElementById('result-image-text').textContent = 
            `${messages[level-1]} (${cps} CPS - Nivel ${level})`;
    }
}