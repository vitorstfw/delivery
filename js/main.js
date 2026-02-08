



function buscarServico() {
  const input = document
    .getElementById("inputServico")
    .value
    .toLowerCase();

  const lista = document.getElementById("lista-servicos");
  const prestadores = JSON.parse(localStorage.getItem("prestadores")) || [];

  lista.innerHTML = "";

  const filtrados = prestadores
    .map((p, index) => ({ ...p, index })) // guarda o índice real
    .filter(p => p.servico.toLowerCase().includes(input));

  if (filtrados.length === 0) {
    lista.innerHTML = "<p>Nenhum prestador encontrado.</p>";
    return;
  }

 filtrados.forEach(p => {
  lista.innerHTML += `
    <div class="card">
      <h3>${p.nome}</h3>
      <p>Serviço: ${p.servico}</p>
      <p>Cidade: ${p.cidade}</p>
      <p>Preço: R$ ${p.preco}</p>

      <button class="btn-solicitar"
        onclick="solicitarServico(${p.id})">
        Solicitar serviço
      </button>
    </div>
  `;
});
}

function solicitarServico(idPrestador) {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  if (!usuarioLogado) {
    alert("Faça login para solicitar um serviço.");
    window.location.href = "login.html";
    return;
  }

  const prestadores = JSON.parse(localStorage.getItem("prestadores")) || [];
  const prestador = prestadores.find(p => p.id === idPrestador);

  if (!prestador) {
    alert("Prestador não encontrado.");
    return;
  }

  const pedido = {
    id: Date.now(),
    idPrestador: prestador.id,
    nomePrestador: prestador.nome,
    idCliente: usuarioLogado.id,
    nomeCliente: usuarioLogado.nome,
    servico: prestador.servico,
    cidade: usuarioLogado.cidade || "",
    status: "pendente"
  };

  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  pedidos.push(pedido);
  localStorage.setItem("pedidos", JSON.stringify(pedidos));

  alert("Pedido enviado com sucesso!");
}