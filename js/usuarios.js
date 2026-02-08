const form = document.getElementById("formUsuario");
const msg = document.getElementById("msg");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const confirmarSenha = document.getElementById("confirmarSenha").value;
  const telefone = document.getElementById("telefone").value;

  if (senha !== confirmarSenha) {
    msg.textContent = "As senhas não coincidem!";
    msg.style.color = "red";
    return;
  }

  const usuario = {
    nome,
    email,
    senha,
    telefone
  };

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  usuarios.push(usuario);

  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  msg.textContent = "Usuário cadastrado com sucesso!";
  msg.style.color = "green";

  form.reset();
});