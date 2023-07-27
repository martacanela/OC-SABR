document.addEventListener("DOMContentLoaded", function() {
    const heading = document.getElementById('headerTumorPrimario');
    const radioInputs = document.querySelectorAll('input[name="cancerPrimario"]');

    radioInputs.forEach(input => {
        input.addEventListener("change", function() {
            if (input.checked) {
                switch (input.value) {
                    case 'mama':
                        heading.innerText = 'Tumor primario - Mama';
                        title = 'Cáncer Primario - Mama'
                        break;
                    case 'pulmon':
                        heading.innerText = 'Tumor primario - Pulmón';
                        heading.style.color = "#FF0000"
                        break;
                    case 'colorrectal':
                        heading.innerText = 'Tumor primario - Colorectal';
                        heading.style.color = "#B45F04"
                        break;
                    case 'prostata':
                        heading.innerText = 'Tumor primario - Próstata';
                        heading.style.color = "#04b404"
                        break;
                    default:
                        heading.innerText = 'Tumor primario';
                        break;
                }
            }
        });
    });
});