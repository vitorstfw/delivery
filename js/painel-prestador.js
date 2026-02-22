const prestadorLogado = JSON.parse(localStorage.getItem("prestadorLogado"));

if (!prestadorLogado) {
  window.location.href = "login-prestador.html";
}

const inputFoto = document.getElementById("fotoPerfil");
const preview = document.getElementById("previewFoto");

inputFoto.addEventListener("change", function(){
const file = this.files[0];

if (file){
  const reader = new FileReader();

  reader.onload = function(){
    preview.src = reader.result;
  };
  reader.readAsDataURL(file);
}
});


const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

const meuspedidos = pedidos.filter(
  p => p.idPrestador === prestadorLogado.id
)

const lista = document.getElementById("listaPedidos");
lista.innerHTML = "";

if(meuspedidos.length === 0){
  lista.innerHTML = "<p>Nenhum pedido recebido.</p>";
}

meuspedidos.forEach(pedidos => {
  const li = document.createElement("li");
  li.textContent = `${pedidos.servicos} - ${pedidos.status}`;
  lista.appendChild(li);
});




function aceitarPedido(idPedido) {
  atualizarStatus(idPedido, "aceito");
}

function recusarPedido(idPedido) {
  atualizarStatus(idPedido, "recusado");
}

function atualizarStatus(idPedido, novoStatus) {
  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

  const pedido = pedidos.find(p => p.id === idPedido);
  if (!pedido) return;

  pedido.status = novoStatus;
  localStorage.setItem("pedidos", JSON.stringify(pedidos));

  location.reload();
}

const abas = document.querySelectorAll(".aba");
const conteudos = document.querySelectorAll(".conteudo-aba");

let map;
let marker;

abas.forEach(botao => {
  botao.addEventListener("click", () => {
    const aba = botao.dataset.aba;

    abas.forEach(b => b.classList.remove("ativa"));
    botao.classList.add("ativa");

    conteudos.forEach(c => {
      c.classList.remove("ativa");
      if (c.id === aba) c.classList.add("ativa");
    });

    if (aba === "mapa"){
      setTimeout(iniciarMapa, 200);
    }
  });
});

let avaliacoes = [];

const listas = document.getElementById("listasAvaliacoes");
const btnAvaliar = document.getElementById("btnAvaliar");

btnAvaliar.addEventListener("click", () =>{
  const comentario = document.getElementById("comentario").value;
  const nota = document.getElementById("nota").value;

  if (!comentario) return alert("Digite um comentário");

  avaliacoes.push({ comentario, nota });
  renderAvaliacoes();

  document.getElementById("comentario").value = "";
});

function renderAvaliacoes() {
  listas.innerHTML = "";

  avaliacoes.forEach(a => {
    listas.innerHTML += `
    <div class="avaliacao">
    <strong>${"⭐".repeat(a.nota)}</strong>
    <p>${a.comentario}</p>
    </div>
    `;
  });
}

function iniciarMapa() {
  if (map) {
map.invalidateSize();
return;
  }

function mostrarMapa() {
  document.getElementById("mapa").style.display = "block";
  document.getElementById("Avaliacoes").style.display = "none";

  setTimeout(() => {
    if (typeof map === "undefined") {
      map.invalidateSize();
    }
  }, 200);
}
 function mostrarAvaliacoes() {
  document.getElementById("Avaliacoes").style.display = "none";
  document.getElementById("mapa").style.display = "block";
}

map = L.map("map").setView([-23.5505, -46.6333], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
  attribution: "© OpenStreetMap",
}).addTo(map);

navigator.geolocation.watchPosition(pos => {
  const lat = pos.coords.latitude;
  const lon = pos.coords.longitude;

  if (!marker){
    marker = L.marker([lat, lon]).addTo(map);
  }else{
    marker.setLatLng([lat, lon]);
  }
  map.setView([lat, lon], 15);
});

}
