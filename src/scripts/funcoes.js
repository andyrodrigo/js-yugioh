function desenharCartao(indice) {
  estado.cartaoExibido.imagem.src = cartas[indice].imagem;
  estado.cartaoExibido.tipo.innerText = "Tipo: " + cartas[indice].tipo;
  estado.cartaoExibido.nome.innerText = "Nome: " + cartas[indice].nome;
  estado.cartaoExibido.poder.innerText = "Poder : " + cartas[indice].poder;
  estado.cartaoExibido.efeito.innerText = "Efeito: " + cartas[indice].efeito;
}

function atribuirCarta(carta, indice) {
  const id = estado.jogador.personagem.cartas[indice].id;
  carta.setAttribute("data-id", id);
  if (!estado.batalha.iniciado) {
    carta.addEventListener("mouseover", () => {
      console.log(carta.getAttribute("data-id"));
      desenharCartao(carta.getAttribute("data-id"));
    });
  }
}

function definirCartas(inicial) {
  cartaDaRodada = [
    estado.cartasEmCampo.carta1,
    estado.cartasEmCampo.carta2,
    estado.cartasEmCampo.carta3,
    estado.cartasEmCampo.carta4,
    estado.cartasEmCampo.carta5,
  ];
  if (inicial === 15) estado.batalha.posicaoDeck = 0;
  for (let i = 0; i < 5; i++) {
    let id = inicial + i;
    if (id >= 15) id -= 15;
    atribuirCarta(cartaDaRodada[i], id);
  }
}

function mover() {
  estado.batalha.posicaoDeck++;
  definirCartas(estado.batalha.posicaoDeck);
}

function iniciar() {
  console.log("foi");
  estado.telas.telaInicial.style.display = "none";
  estado.telas.telaJogo.style.display = "flex";

  definirCartas(0);
  estado.batalha.iniciado = true;
}
