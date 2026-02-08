

const form = document.getElementById("formLoginPrestador");
const msg = document.getElementById("msg");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  const prestadores = JSON.parse(localStorage.getItem("prestadores")) || [];

  const prestador = prestadores.find(
    (p) => p.email === email && p.senha === senha
  );

  if (!prestador) {
    msg.textContent = "Email ou senha inválidos!";
    msg.style.color = "red";
    return;
  }

  localStorage.setItem("prestadorLogado", JSON.stringify(prestador));
  msg.textContent = "Login realizado com sucesso!";
  msg.style.color = "green";

  setTimeout(() => {
    window.location.href = "painel-prestador.html";
  }, 800);
});