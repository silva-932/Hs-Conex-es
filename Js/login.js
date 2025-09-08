document.addEventListener('DOMContentLoaded', () => {
  const alerta = document.getElementById('mensagem-alerta');

  function mostrarMensagem(mensagem, tipo) {
    alerta.textContent = mensagem;
    alerta.className =
      'mensagem-alerta ' +
      (tipo === 'sucesso' ? 'mensagem-sucesso' : 'mensagem-erro');
    alerta.style.display = 'block';
  }

  // LOGIN
  document
    .getElementById('login-form')
    .addEventListener('submit', async function (e) {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const senha = document.getElementById('login-senha').value;

      try {
        const res = await fetch('/.netlify/functions/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, senha }),
        });

        const data = await res.json();

        if (res.ok) {
          mostrarMensagem(data.message, 'sucesso');

          // salvar informações do usuário
          localStorage.setItem('userLoggedIn', 'true');
          localStorage.setItem('userEmail', data.usuario.email);
          localStorage.setItem('userRole', data.usuario.role || 'user');

          setTimeout(() => {
            if (data.usuario.role === 'admin') {
              window.location.href = '../Pag/admin-dashboard.html';
            } else {
              window.location.href = '../Pag/serviços.html';
            }
          }, 1500);
        } else {
          mostrarMensagem(data.message || 'Erro ao iniciar sessão.', 'erro');
        }
      } catch (erro) {
        mostrarMensagem('Falha na conexão com o servidor.', 'erro');
      }
    });

  // REGISTRO
  document
    .getElementById('register-form')
    .addEventListener('submit', async function (e) {
      e.preventDefault();
      const email = document.getElementById('register-email').value;
      const senha = document.getElementById('register-senha').value;

      try {
        const res = await fetch('/.netlify/functions/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, senha }),
        });

        const data = await res.json();

        if (res.ok) {
          mostrarMensagem(data.message, 'sucesso');

          // salvar informações do usuário
          localStorage.setItem('userLoggedIn', 'true');
          localStorage.setItem('userEmail', data.usuario.email);
          localStorage.setItem('userRole', data.usuario.role || 'user');

          setTimeout(() => {
            if (data.usuario.role === 'admin') {
              window.location.href = '../Pag/admin-dashboard.html';
            } else {
              window.location.href = '../Pag/serviços.html';
            }
          }, 1500);
        } else {
          mostrarMensagem(data.message || 'Erro ao cadastrar.', 'erro');
        }
      } catch (erro) {
        mostrarMensagem('Falha na conexão com o servidor.', 'erro');
      }
    });
});
