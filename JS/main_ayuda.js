let edadInput = document.getElementById('edad');
let nombre = document.getElementById('nombre');
let btn = document.getElementById('btn');

let edadLegal = false;

edadInput.addEventListener('input', function () {
    let edad = parseInt(edadInput.value);

    if (edad < 18 || edad > 80) {
        edadInput.setCustomValidity('Por favor, ingresa una edad válida entre 18 y 80.');
        edadLegal = true;
    } else {
        edadInput.setCustomValidity('');
        edadLegal = false;
    }
});

btn.addEventListener("click", () => {
    if (nombre.value.trim() === "") {
        alert("Por favor, completa todos los campos antes de continuar.");
        return;
    }

    if (!edadInput.checkValidity()) {
        edadInput.reportValidity(); // Muestra el mensaje de error
        return;
    }

    alert("¡Gracias por compartir tu experiencia!");
    location.reload();
});
