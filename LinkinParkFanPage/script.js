document.addEventListener("DOMContentLoaded", function() {
    const mostrarLetrasBtn = document.getElementById("mostrar-letras");
    const letrasContainer = document.getElementById("letras-container");

    
    const canciones = [
        { titulo: "Numb", letra: "I'm tired of being what you want me to be..." },
        { titulo: "In the End", letra: "It starts with one thing, I don't know why..." },
    ];

    function mostrarLetras() {
        letrasContainer.innerHTML = "";

        canciones.forEach(cancion => {
            const parrafo = document.createElement("p");
            parrafo.textContent = `${cancion.titulo}: ${cancion.letra}`;
            letrasContainer.appendChild(parrafo);
        });

        letrasContainer.style.display = "block"; 
    }

    mostrarLetrasBtn.addEventListener("click", mostrarLetras);
});
