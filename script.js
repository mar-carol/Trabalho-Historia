const form = document.getElementById("formDenuncia");

const nome = document.getElementById("nome");
const email = document.getElementById("email");
const anonimo = document.getElementById("anonimo");
const descricao = document.getElementById("descricao");

const mensagem = document.getElementById("mensagem");
const contador = document.getElementById("contador");


defaultState();

let totalDenuncias = localStorage.getItem("denuncias");

if(totalDenuncias === null){

  totalDenuncias = 0;

} else {

  totalDenuncias = parseInt(totalDenuncias);

}

contador.textContent = totalDenuncias;

anonimo.addEventListener("change", updateAnonimoState);

form.addEventListener("submit", function(event){

  event.preventDefault();

  const isAnonimo = anonimo.checked;
  const descricaoTrim = descricao.value.trim();

  if(descricaoTrim === ""){
    mensagem.textContent = "Descreva a situação.";
    mensagem.style.color = "red";
    return;
  }

  if(!isAnonimo){
    const nomeTrim = nome.value.trim();
    const emailTrim = email.value.trim();

    if(nomeTrim === "" || emailTrim === ""){
      mensagem.textContent = "Preencha todos os campos.";
      mensagem.style.color = "red";
      return;
    }

    if(!emailTrim.includes("@")){
      mensagem.textContent = "Email inválido.";
      mensagem.style.color = "red";
      return;
    }
  }

  totalDenuncias++;

  contador.textContent = totalDenuncias;

  localStorage.setItem("denuncias", totalDenuncias);

  if(isAnonimo) {
    mensagem.textContent = "Denúncia enviada com sucesso (anônima).";
  } else {
    mensagem.textContent = "Denúncia enviada com sucesso (simulação).";
  }

  mensagem.style.color = "green";

  form.reset();
  updateAnonimoState();

});

function updateAnonimoState(){
  const isAnonimo = anonimo.checked;
  nome.disabled = isAnonimo;
  email.disabled = isAnonimo;

  if(isAnonimo){
    nome.value = "";
    email.value = "";
  }
}

function defaultState(){
  anonimo.checked = false;
  updateAnonimoState();
}
