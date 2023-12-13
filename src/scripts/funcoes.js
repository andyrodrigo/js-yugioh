function desenharCartao(indice) {
  //console.log(cartas[indice]);
  // estado.cartaoExibido.imagem.src = cartas[indice].imagem;
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
      //console.log(carta.getAttribute("data-id"));
      desenharCartao(carta.getAttribute("data-id"));
      estado.telas.telaJogar.style.display = "none";
    });
    carta.addEventListener("mousedown", () => {
      //console.log(carta.getAttribute("data-id"));
      const cartaAtual = carta.getAttribute("data-id");
      desenharCartao(cartaAtual);
      estado.telas.telaJogar.style.display = "flex";
      estado.batalha.selecionadoJogador = cartaAtual;
      estado.cartaoExibido.cartaSelecionada.innerText = cartas[cartaAtual].nome;
      //console.log("cartaAtual: ", estado.batalha.selecionadoJogador);
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

function verificarVitoria(tipo1, tipo2) {
  if (tipo1 === tipo2) {
    return { resultado: "empatou", mensagem: "Ambos têm o mesmo tipo" };
  }

  if (resultados[tipo1].vence.includes(tipo2)) {
    const i = resultados[tipo1].vence.indexOf(tipo2);
    return {
      resultado: "venceu",
      mensagem: resultados[tipo1][`mensagem${i + 1}`],
    };
  } else {
    const i = resultados[tipo2].vence.indexOf(tipo1);
    return {
      resultado: "perdeu",
      mensagem: resultados[tipo2][`mensagem${i + 1}`],
    };
  }
}

function analisarCombate() {
  const indiceAleatorio = Math.floor(Math.random() * yugi.cartas.length);
  cartaComputador = yugi.cartas[indiceAleatorio];
  cartaJogador = yugi.cartas[estado.batalha.selecionadoJogador];
  console.log("Carta do PC", cartaComputador);
  console.log("Carta do Jogador", cartaJogador);

  const resultado = verificarVitoria(cartaJogador.tipo, "Spock"); //cartaComputador.tipo);
  console.log("Resultado", resultado);
}

function jogar() {
  console.log("jogou");
  estado.telas.telaJogar.style.display = "none";
  estado.telas.telaBatalha.style.display = "flex";
  analisarCombate();
}
