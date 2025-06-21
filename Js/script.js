document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contact-form");
    const messageList = document.getElementById("message-list");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${name} (${email})</strong><p>${message}</p>`;

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Excluir";
        deleteButton.classList.add("delete");
        deleteButton.addEventListener("click", function() {
            messageList.removeChild(listItem);
        });

        listItem.appendChild(deleteButton);
        messageList.appendChild(listItem);

        form.reset();
    });
});
