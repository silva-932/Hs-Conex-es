// atendimento.js

// Captura de elementos
const form = document.getElementById('design-form');
const listaPedidos = document.getElementById('lista-pedidos');
const mensagemSucesso = document.getElementById('mensagem-sucesso');

// Armazenar pedidos (simulado)
let pedidos = [];

// Função para criar item na lista
function adicionarPedido(pedido) {
  const item = document.createElement('li');
  item.className = 'pedido-item';

  item.innerHTML = `
    <strong>${pedido.nome}</strong> - ${pedido.tipo} <br>
    <small><i class="fa fa-envelope"></i> ${pedido.email} | <i class="fa fa-phone"></i> ${pedido.telefone}</small><br>
    <p>${pedido.mensagem}</p>
    <small><i class="fa fa-clock"></i> Entrega até: ${pedido.prazo}</small>
  `;

  listaPedidos.prepend(item);
}

// Evento de envio do formulário
form.addEventListener('submit', function(e) {
  e.preventDefault();

  // Captura dos valores
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const telefone = document.getElementById('telefone').value;
  const tipo = document.getElementById('tipo').value;
  const prazo = document.getElementById('prazo').value;
  const mensagem = document.getElementById('mensagem').value;

  // Criação do pedido
  const pedido = { nome, email, telefone, tipo, prazo, mensagem };
  pedidos.push(pedido);

  // Adiciona à lista visual
  adicionarPedido(pedido);

  // Limpar formulário
  form.reset();

  // Mostrar mensagem de sucesso
  mensagemSucesso.style.display = 'block';
  setTimeout(() => {
    mensagemSucesso.style.display = 'none';
  }, 3000);
});
