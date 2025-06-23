document.addEventListener('DOMContentLoaded', () => {
  // LOGIN
  document.getElementById('login-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const senha = document.getElementById('login-senha').value;

    const res = await fetch('/.netlify/functions/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });

    const data = await res.json();
    alert(data.message);

    if (res.ok) {
      // Corrigido para 'userLoggedIn'
      localStorage.setItem('userLoggedIn', 'true');
      localStorage.setItem('userEmail', email); // opcional, se quiser guardar o e-mail
      window.location.href = '../Pag/serviços.html';
    }
  });

  // REGISTRO
  document.getElementById('register-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const email = document.getElementById('register-email').value;
    const senha = document.getElementById('register-senha').value;

    const res = await fetch('/.netlify/functions/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });

    const data = await res.json();
    alert(data.message);

    if (res.ok) {
      localStorage.setItem('userLoggedIn', 'true');
      localStorage.setItem('userEmail', email); // opcional
      window.location.href = '../Pag/serviços.html';
    }
  });
});
