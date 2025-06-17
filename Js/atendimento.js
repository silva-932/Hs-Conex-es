// atendimento.js

// Captura de elementos
const form = document.getElementById('design-form');
const listaPedidos = document.getElementById('lista-pedidos');
const mensagemSucesso = document.getElementById('mensagem-sucesso');

const tipoClienteRadios = document.querySelectorAll('input[name="tipo-cliente"]');
const camposUnipessoal = document.getElementById('campos-unipessoal');
const camposEmpresa = document.getElementById('campos-empresa');

const campoResposta = document.getElementById('prazo');
const avisoResposta = document.getElementById('prazo-info');

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
    <small><i class="fa fa-clock"></i> Resposta prevista: ${pedido.prazo}</small>
  `;

  listaPedidos.prepend(item);
}

// Evento de envio do formulário
form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Captura dos valores
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const telefone = document.getElementById('telefone').value;
  const tipo = document.getElementById('tipo').value;
  const prazo = document.getElementById('prazo').value;
  const mensagem = document.getElementById('mensagem').value;

  const pedido = { nome, email, telefone, tipo, prazo, mensagem };
  pedidos.push(pedido);

  adicionarPedido(pedido);
  form.reset();
  calcularLimitesResposta(); // Recalcular após reset

  mensagemSucesso.style.display = 'block';
  setTimeout(() => {
    mensagemSucesso.style.display = 'none';
  }, 3000);
});

// Mostrar campos conforme tipo de cliente
tipoClienteRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    if (radio.value === 'unipessoal') {
      camposUnipessoal.classList.add('ativo');
      camposEmpresa.classList.remove('ativo');
    } else if (radio.value === 'empresa') {
      camposEmpresa.classList.add('ativo');
      camposUnipessoal.classList.remove('ativo');
    }
  });
});

// Limites de resposta entre 1h30 e 48h a partir do agora
function calcularLimitesResposta() {
  const agora = new Date();

  const minimo = new Date(agora.getTime() + (1.5 * 60 * 60 * 1000)); // +1h30
  const maximo = new Date(agora.getTime() + (48 * 60 * 60 * 1000)); // +48h

  const formatarDataHora = data => {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    const hora = String(data.getHours()).padStart(2, '0');
    const minuto = String(data.getMinutes()).padStart(2, '0');
    return `${ano}-${mes}-${dia}T${hora}:${minuto}`;
  };

  campoResposta.min = formatarDataHora(minimo);
  campoResposta.max = formatarDataHora(maximo);
  campoResposta.value = formatarDataHora(minimo);

  avisoResposta.innerText = `A resposta será entre ${minimo.toLocaleString()} e ${maximo.toLocaleString()}`;
}

document.addEventListener('DOMContentLoaded', () => {
  if (campoResposta && avisoResposta) {
    calcularLimitesResposta();
  }
});
