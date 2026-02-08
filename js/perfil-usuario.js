const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

if(!usuarioLogado){
    window.location.href = "login.html";
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

document.getElementById("nome").textContent = usuarioLogado.nome;
document.getElementById("email").textContent = usuarioLogado.email;


document.getElementById("btnSair").addEventListener("click", () =>{
localStorage.removeItem("usarioLogado");
window.location.href = "login.html";
});