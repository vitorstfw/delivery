const form = document.getElementById("formLogin");
const msg = document.getElementById("msg");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const usuarioEncontrado = usuarios.find(
    (u) => u.email === email && u.senha === senha
  );

  if (usuarioEncontrado) {
    msg.textContent = "Login realizado com sucesso!";
    msg.style.color = "green";

    // Salva usuário logado
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));
    window.location.href = "perfil-usuario.html";

    // Redireciona (exemplo)
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);

  } else {
    msg.textContent = "Email ou senha inválidos!";
    msg.style.color = "red";
  }
});