// ==============================
// DESAFIO 1 - MOSTRAR/ESCONDER
// ==============================
function toggleIngredientes() {
  const ingredientes = document.querySelector('.conteudo-ingredientes');

  if (ingredientes.style.display === 'none' || ingredientes.style.display === '') {
    ingredientes.style.display = 'block';
  } else {
    ingredientes.style.display = 'none';
  }
}

function toggleIngredientesMorango() {
  const ingredientes = document.querySelector('.ingredientes-morango');

  if (ingredientes.style.display === 'none' || ingredientes.style.display === '') {
    ingredientes.style.display = 'block';
  } else {
    ingredientes.style.display = 'none';
  }
}

// ==============================
// DESAFIO 2 - TROCAR IMAGEM
// ==============================
function trocarImagem() {
  const img = document.getElementById("boloImg");
    if(img.src.includes('bolo-mari')) {
      img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4rB1jZuOTGErRWUCkFHntt_Bdc7gEGbg9kdX698miN2a42ZF5UKYhX-Le4t_J9T_36iApqvhG1SAaLnIgFC5E23UOOUYvFmHEpXktpINAxg&s=10";
    } else {
      img.src = "https://www.coisasdaleia.com.br/wp-content/uploads/2024/10/bolo-mari.jpg";
    }
  }

// ==============================
// DESAFIO 3 - CONTADOR
// ==============================
let total = 0;

function favoritar() {

  let total = 0;
  total ++;
  document.getElementById('contador').innerHTML = 'favoritos: ' + total;

}


// ==============================
// DESAFIO 4 - VALIDAÇÃO
// ==============================
function enviar() {
  const nome = document.getElementById("nome").value;
   if (nome === ""){
       alert("Por favor, preencha o campo nome.");
   }else {
        alert("Bem- vindo " + nome + "!");
   }
}