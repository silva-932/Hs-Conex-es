document.addEventListener("DOMContentLoaded", () => {
    let currentIndex = 0;
    const slides = document.querySelectorAll(".carousel-item");
    const dots = document.querySelectorAll(".dot");
    const carouselInner = document.querySelector(".carousel-inner");
    const totalSlides = slides.length;
    
    // Ajusta a largura do contêiner do carrossel dinamicamente
    carouselInner.style.width = `${totalSlides * 100}%`;

    slides.forEach(slide => {
        slide.style.width = `${100 / totalSlides}%`;
    });

    function showSlide(index) {
        if (index >= totalSlides) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = totalSlides - 1;
        } else {
            currentIndex = index;
        }

        // Move o carrossel
        carouselInner.style.transform = `translateX(-${currentIndex * (100 / totalSlides)}%)`;

        // Atualiza os indicadores (dots)
        dots.forEach(dot => dot.classList.remove("active"));
        dots[currentIndex].classList.add("active");
    }

    // Muda de slide manualmente
    function moveSlide(step) {
        showSlide(currentIndex + step);
    }

    // Pula para um slide específico
    function currentSlide(index) {
        showSlide(index);
    }

    // Auto play apenas quando a aba estiver ativa
    let autoPlay = setInterval(() => {
        moveSlide(1);
    }, 3000);

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            clearInterval(autoPlay);
        } else {
            autoPlay = setInterval(() => {
                moveSlide(1);
            }, 3000);
        }
    });

    // Adiciona eventos aos botões de navegação
    document.querySelector(".prev").addEventListener("click", () => moveSlide(-1));
    document.querySelector(".next").addEventListener("click", () => moveSlide(1));

    // Adiciona eventos aos indicadores (dots)
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => currentSlide(index));
    });

    // Inicializa o carrossel corretamente
    showSlide(currentIndex);
});
