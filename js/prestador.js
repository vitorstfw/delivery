const form = document.getElementById("formPrestador");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const senha = document.getElementById("senha").value;
  const confirmarSenha = document.getElementById("confirmarSenha").value;

  if(senha !== confirmarSenha){
    alert("as senhas não coincidem. Por favor, tente novamente.");
    return;
  }

  let prestadores = JSON.parse(localStorage.getItem("prestadores")) || [];

  const email = document.getElementById("email").value;

  const emailExiste = prestadores.some(p => p.email === email);
  if (emailExiste){
    alert("Este email já está cadastrado. Por favor, use outro email.");
    return;
  }

  const prestador = {
    id: Date.now(),
    nome: document.getElementById("nome").value,
    email: email,
    senha: senha,
    servico: document.getElementById("servico").value,
    cidade: document.getElementById("cidade").value,
    valor: document.getElementById("valor").value,
  descricao: document.getElementById("descricao").value,
  disponibilidade: document.getElementById("disponibilidade").value,
  foto:null
  };

  prestadores.push(prestador);
  localStorage.setItem("prestadores", JSON.stringify(prestadores));

  alert("prestador cadastrado com sucesso!");
  form.reset();

  window.location.href = "login-prestadores.html";
});