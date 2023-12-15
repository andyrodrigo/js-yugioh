function moverCartaParaUltimaPosicao(id, deck) {
  const indice = deck.findIndex((objeto) => objeto.id === id);

  if (indice !== -1 && indice !== deck.length - 1) {
    const carta = deck.splice(indice, 1)[0];
    deck.push(carta);
  }
  //console.log("deck: ", deck);
}

function testarFimDeJogo(energia, resultado) {
  if (energia <= 0) {
    estado.batalha.iniciado = false;
    setTimeout(() => {
      estado.vista.mensagemBatalha.textContent = `Você ${resultado} a duelo!`;
      setTimeout(() => {
        sair();
      }, 3000);
    }, 3000);
  }
}

function realizarEfeito(jogadorAtual, carta) {
  const id = carta.id;
  switch (id) {
    case 13:
      console.log("olho");
      estado[jogadorAtual].energia += 500;
      break;
    default:
      break;
  }
}

function realizarResultado(resultado) {
  if (resultado === "venceu") {
    const poder = estado.jogador.cartaSelecionada.poder;
    estado.computador.energia -= poder;
    testarFimDeJogo(estado.computador.energia, resultado);
    if (estado.batalha.iniciado) {
      realizarEfeito("jogador", estado.jogador.cartaSelecionada);
    }
  } else if (resultado === "perdeu") {
    const poder = estado.computador.cartaSelecionada.poder;
    estado.jogador.energia -= poder;
    testarFimDeJogo(estado.jogador.energia, resultado);
    if (estado.batalha.iniciado) {
      realizarEfeito("computador", estado.jogador.cartaSelecionada);
    }
  } else {
    realizarEfeito("jogador", estado.jogador.cartaSelecionada);
    realizarEfeito("computador", estado.jogador.cartaSelecionada);
  }

  if (estado.batalha.iniciado) {
    estado.vista.energiaComputador.textContent = estado.computador.energia;
    estado.vista.energiaJogador.textContent = estado.jogador.energia;

    moverCartaParaUltimaPosicao(
      estado.jogador.cartaSelecionada.id,
      estado.jogador.deck
    );

    moverCartaParaUltimaPosicao(
      estado.computador.cartaSelecionada.id,
      estado.computador.deck
    );

    estado.batalha.turno++;

    setTimeout(() => {
      estado.telas.telaBatalha.style.display = "none";
    }, 3000);
  }
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
  const indiceAleatorio = Math.floor(Math.random() * 5);

  cartaJogador = estado.jogador.cartaSelecionada;
  cartaComputador = estado.computador.deck[indiceAleatorio];
  estado.computador.cartaSelecionada = cartaComputador;

  //console.log("Carta do PC", cartaComputador);
  //console.log("Carta do Jogador", cartaJogador);

  const resultado = verificarVitoria(cartaJogador.tipo, cartaComputador.tipo);

  estado.vista.mensagemBatalha.textContent = `${resultado.mensagem}! Jogador ${resultado.resultado}! `;

  realizarResultado(resultado.resultado);

  //console.log("Resultado", resultado);
}

function jogar() {
  estado.telas.telaJogar.style.display = "none";
  estado.telas.telaBatalha.style.display = "flex";
  //console.log("carta em jogo: ", estado.jogador.cartaSelecionada);
  analisarCombate();
}

function desenharCartao(carta) {
  // estado.cartaoExibido.imagem.src = cartas.imagem;
  estado.cartaoExibido.tipo.innerText = "Tipo: " + carta.tipo;
  estado.cartaoExibido.nome.innerText = "Nome: " + carta.nome;
  estado.cartaoExibido.poder.innerText = "Poder : " + carta.poder;
  estado.cartaoExibido.efeito.innerText = "Efeito: " + carta.efeito;
}

function buscarCarta(deck, id) {
  return deck.find((carta) => carta.id === id);
}

function atribuirCarta(carta, id) {
  carta.setAttribute("data-id", id);

  if (!estado.batalha.iniciado) {
    const dataId = Number(carta.getAttribute("data-id"));

    carta.addEventListener("mouseover", () => {
      desenharCartao(estado.jogador.deck[dataId]);
      estado.telas.telaJogar.style.display = "none";
    });
    carta.addEventListener("mousedown", () => {
      desenharCartao(estado.jogador.deck[dataId]);
      estado.telas.telaJogar.style.display = "flex";
      estado.jogador.cartaSelecionada = estado.jogador.deck[dataId];
      estado.cartaoExibido.cartaSelecionada.innerText =
        estado.jogador.deck[dataId].nome;
    });
  }
}

function definirCartas() {
  const cartaDaRodada = [
    estado.cartasEmCampo.carta1,
    estado.cartasEmCampo.carta2,
    estado.cartasEmCampo.carta3,
    estado.cartasEmCampo.carta4,
    estado.cartasEmCampo.carta5,
  ];

  for (let i = 0; i < 5; i++) {
    atribuirCarta(cartaDaRodada[i], i);
  }
}

function teste() {
  console.log("teste");
  const carta = buscarCarta(cartas, 0);
}

function mostrarProximo() {
  const id = estado.jogador.deck[5].id;
  const carta = buscarCarta(estado.jogador.personagem.cartas, id);
  desenharCartao(carta);
}

function embaralharDeck(deck) {
  const novoDeck = [...deck];
  for (let i = novoDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [novoDeck[i], novoDeck[j]] = [novoDeck[j], novoDeck[i]];
  }

  return novoDeck;
}

function zerarPlacares() {
  estado.jogador.energia = 2000;
  estado.computador.energia = 2000;
  estado.jogador.efeitos = [];
  estado.computador.efeitos = [];
  estado.batalha.turno = 1;
  estado.jogador.cartaSelecionada = undefined;
  estado.computador.cartaSelecionada = undefined;
}

function sair() {
  estado.telas.telaInicial.style.display = "block";
  estado.telas.telaJogo.style.display = "none";
  estado.telas.telaBatalha.style.display = "none";
  estado.telas.telaJogar.style.display = "none";
  estado.batalha.iniciado = false;
}

function iniciar() {
  zerarPlacares();

  estado.vista.energiaComputador.textContent = estado.computador.energia;
  estado.vista.energiaJogador.textContent = estado.jogador.energia;
  desenharCartao(cartaVazia);

  estado.telas.telaInicial.style.display = "none";
  estado.telas.telaJogo.style.display = "flex";

  estado.jogador.deck = embaralharDeck(estado.jogador.personagem.cartas);
  estado.computador.deck = embaralharDeck(estado.computador.personagem.cartas);

  //console.log("Deck Jogador: ", estado.jogador.deck);
  //console.log("Deck Computador: ", estado.computador.deck);

  definirCartas();

  estado.batalha.iniciado = true;
}
