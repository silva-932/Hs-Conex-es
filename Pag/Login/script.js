document.addEventListener("DOMContentLoaded", () => {
    const inputs = document.querySelectorAll(".input-group input");

    // Animação da label flutuante
    inputs.forEach(input => {
        input.addEventListener("focus", () => {
            input.labels[0].classList.add("focused");
        });

        input.addEventListener("blur", () => {
            if (input.value === "") {
                input.labels[0].classList.remove("focused");
            }
        });
    });

    // Exibir mensagem ao clicar no botão de login (simulação)
    document.querySelector(".login-btn").addEventListener("click", (e) => {
        e.preventDefault();
        alert("Login efetuado com sucesso! (Simulação)");
    });
});
