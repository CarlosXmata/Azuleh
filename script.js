document.addEventListener('DOMContentLoaded', () => {
    // Manejo del formulario de contacto
    const formResponse = document.getElementById('formResponse');
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Usar Fetch API para enviar el formulario a Formspree
        const formData = new FormData(contactForm);
        fetch(contactForm.action, {
            method: contactForm.method,
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                formResponse.textContent = 'Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.';
                formResponse.style.color = '#28a745';
                formResponse.style.opacity = 1;
                contactForm.reset();
                setTimeout(() => {
                    formResponse.style.opacity = 0;
                }, 5000);
            } else {
                response.json().then(data => {
                    if (Object.hasOwnProperty.call(data, 'errors')) {
                        formResponse.textContent = data.errors.map(error => error.message).join(', ');
                        formResponse.style.color = '#dc3545';
                        formResponse.style.opacity = 1;
                    } else {
                        formResponse.textContent = 'Algo salió mal. Por favor, inténtalo de nuevo.';
                        formResponse.style.color = '#dc3545';
                        formResponse.style.opacity = 1;
                    }
                });
            }
        })
        .catch(error => {
            formResponse.textContent = 'Hubo un error al enviar el formulario.';
            formResponse.style.color = '#dc3545';
            formResponse.style.opacity = 1;
        });
        
    });

    // Manejo de los botones "Comprar Ahora"
    const buyButtons = document.querySelectorAll('.buy-button');
    buyButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const productName = button.closest('.card-body').querySelector('.card-title').textContent;
            document.getElementById('product').value = productName;
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Manejo del formulario de personalización
    const customizeResponse = document.getElementById('customizeResponse');
    const customizeForm = document.getElementById('customizeForm');
    const previewImage = document.getElementById('previewImage');
    const productSelect = document.getElementById('productSelect');
    const colorInputs = document.querySelectorAll('input[name="color"]');

    customizeForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Aquí puedes manejar la personalización como desees, por ejemplo, enviando los datos a tu correo
        // Actualmente, solo mostramos un mensaje de éxito

        customizeResponse.textContent = '¡Gracias por personalizar tu bolso! Nos pondremos en contacto contigo pronto.';
        customizeResponse.style.color = '#28a745';
        customizeResponse.style.opacity = 1;
        customizeForm.reset();
        setTimeout(() => {
            customizeResponse.style.opacity = 0;
        }, 5000);
    });

    // Actualizar la vista previa al seleccionar producto y color
    function updatePreview() {
        const selectedProduct = productSelect.value;
        let selectedColor = 'default';

        colorInputs.forEach(input => {
            if (input.checked) {
                selectedColor = input.value.toLowerCase();
            }
        });

        // Supongamos que tienes imágenes para cada combinación de producto y color
        // Por ejemplo: cartera_elegante_rojo.jpg, cartera_elegante_azul.jpg, etc.
        const baseName = selectedProduct.toLowerCase().replace(/\s+/g, '_');
        const colorName = selectedColor !== 'default' ? `_${selectedColor}` : '';
        const imagePath = `${baseName}${colorName}.png`; // Asegúrate de que las imágenes existan en esta ruta

        previewImage.src = imagePath;
        previewImage.alt = `${selectedProduct} - ${selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)}`;
    }

    productSelect.addEventListener('change', updatePreview);
    colorInputs.forEach(input => {
        input.addEventListener('change', updatePreview);
    });

    // Manejo de la animación de bienvenida
    const welcomeOverlay = document.getElementById('welcomeOverlay');
    setTimeout(() => {
        welcomeOverlay.style.opacity = 0;
        setTimeout(() => {
            welcomeOverlay.style.display = 'none';
        }, 1000);
    }, 3000);
    document.getElementById("toggle-content").addEventListener("click", function() {
        const moreContent = document.querySelector(".content-more");
        const isHidden = moreContent.style.display === "none";
    
        moreContent.style.display = isHidden ? "block" : "none";
        this.textContent = isHidden ? "Ver menos" : "Ver más";
    });
    
});
