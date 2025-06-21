// Captura de elementos
const form = document.getElementById('design-form');
const listaPedidos = document.getElementById('lista-pedidos');
const mensagemSucesso = document.getElementById('mensagem-sucesso');

const tipoClienteSelect = document.getElementById('tipo-cliente');
const camposUnipessoal = document.getElementById('campos-unipessoal');
const camposEmpresa = document.getElementById('campos-empresa');

const campoEmail = document.getElementById('email');
const campoTelefone = document.getElementById('telefone');
const campoTipoServico = document.getElementById('tipo');
const campoMensagem = document.getElementById('mensagem');
const campoRespostaEstimada = document.getElementById('resposta-estimada');

// Armazenamento local (simulado)
let pedidos = [];

// Mostrar/ocultar campos com base no tipo de cliente
tipoClienteSelect.addEventListener('change', () => {
  const tipo = tipoClienteSelect.value;
  camposUnipessoal.style.display = tipo === 'unipessoal' ? 'block' : 'none';
  camposEmpresa.style.display = tipo === 'empresa' ? 'block' : 'none';
});

// Função para estimar prazo
function estimarPrazo() {
  const agora = new Date();
  const prazoMin = new Date(agora.getTime() + 1.5 * 60 * 60 * 1000); // 1h30m
  const prazoMax = new Date(agora.getTime() + 48 * 60 * 60 * 1000); // 48h

  const estimativa = `Entre ${prazoMin.toLocaleString()} e ${prazoMax.toLocaleString()}`;
  campoRespostaEstimada.textContent = estimativa;
  return estimativa;
}

// Função para adicionar novo pedido à lista
function adicionarPedido(pedido) {
  const item = document.createElement('li');
  item.className = 'pedido-item';

  item.innerHTML = `
    <strong>${pedido.nome}</strong> - ${pedido.tipoServico} <br>
    <small><i class="fa fa-envelope"></i> ${pedido.email} | <i class="fa fa-phone"></i> ${pedido.telefone}</small><br>
    <p>${pedido.mensagem}</p>
    <small><i class="fa fa-clock"></i> Resposta prevista: ${pedido.prazo}</small>
  `;

  listaPedidos.prepend(item);
}

// Evento de envio do formulário
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const tipoCliente = tipoClienteSelect.value;
  let nome = '';

  if (tipoCliente === 'unipessoal') {
    nome = document.getElementById('nome-unipessoal').value;
  } else if (tipoCliente === 'empresa') {
    nome = document.getElementById('nome-empresa').value;
  }

  const email = campoEmail.value;
  const telefone = campoTelefone.value;
  const tipoServico = campoTipoServico.value;
  const mensagem = campoMensagem.value;
  const prazo = estimarPrazo();

  const pedido = { nome, email, telefone, tipoServico, mensagem, prazo };
  pedidos.push(pedido);

  adicionarPedido(pedido);
  form.reset();
  camposUnipessoal.style.display = 'none';
  camposEmpresa.style.display = 'none';

  estimarPrazo(); // Atualiza estimativa

  mensagemSucesso.style.display = 'block';
  setTimeout(() => {
    mensagemSucesso.style.display = 'none';
  }, 3000);
});

// Calcular prazo ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  estimarPrazo();
});
