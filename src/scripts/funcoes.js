function moverCartaParaUltimaPosicao(id, deck) {
  const indice = deck.findIndex((objeto) => objeto.id === id);

  if (indice !== -1 && indice !== deck.length - 1) {
    const carta = deck.splice(indice, 1)[0];
    deck.push(carta);
  }
  //console.log("deck: ", deck);
}

function testarFimDeJogo(vitima) {
  if (estado[vitima].energia <= 0) {
    estado.batalha.iniciado = false;
    let resultado = "venceu";
    if (vitima === "jogador") resultado = "perdeu";

    setTimeout(() => {
      estado.vista.mensagemBatalha.textContent = `Você ${resultado} o duelo!`;
      setTimeout(() => {
        sair();
      }, 3000);
    }, 3000);
  }
}

function realizarEfeito(atacante, vitima, carta) {
  const id = carta.id;
  switch (id) {
    case 10:
      console.log("chifre");
      estado[atacante].bonusAtaque += 100;
      // estado[jogadorAtual].bonusTemporario.push({
      //   bonus: 100,
      //   turno: 0,
      //   tipo: "poder",
      // });
      break;
    case 11:
      console.log("espelho");
      if (estado[vitima].cartaSelecionada.id !== 11) {
        causarDano(atacante, vitima, estado[vitima].cartaSelecionada);
      }
      break;
    case 13:
      console.log("recuperação");
      estado[atacante].energia += 500;
      break;
    case 14:
      console.log("olho");
      if (atacante === "jogador") {
        estado.vista.botaoBloqueado.removeAttribute("disabled");
        estado.batalha.bloqueioBotaoProximo = false;
      }
      break;
    default:
      break;
  }
}

function resolverTurnoDoPoder(lista) {
  //const lista =
  lista.forEach((objeto, index) => {
    if (objeto.tipo === "poder") {
      if (objeto.valor < 2) {
        objeto.valor += 1;
      } else {
        lista.splice(index, 1);
      }
    }
  });
}

function verEfeitosExtras() {
  // console.log("efeitoJ: ", estado.jogador.bonusTemporario);
  // console.log("efeitoPC: ", estado.computador.bonusTemporario);
  // if (estado.jogador.bonusTemporario.length > 0) {
  //   resolverTurnoDoPoder(estado.jogador.bonusTemporario);
  // }
  // if (estado.computador.bonusTemporario.length > 0) {
  //   resolverTurnoDoPoder(estado.computador.bonusTemporario);
  // }

  //Aumento de pode Exodia
  for (let i = 0; i < 5; i++) {
    if (estado.jogador.deck[i].id === 2) {
      estado.jogador.deck[i].poder += 400;
    }
    if (estado.computador.deck[i].id === 2) {
      estado.computador.deck[i].poder += 400;
    }
  }
}

function causarDano(atacante, vitima, carta) {
  const poder = carta.poder + estado[atacante].bonusAtaque;

  estado[vitima].energia -= poder;

  testarFimDeJogo(vitima);

  if (estado.batalha.iniciado) realizarEfeito(atacante, vitima, carta);
}

function realizarResultado(resultado) {
  if (resultado === "venceu") {
    causarDano("jogador", "computador", estado.jogador.cartaSelecionada);
  } else if (resultado === "perdeu") {
    causarDano("computador", "jogador", estado.computador.cartaSelecionada);
  } else {
    realizarEfeito("jogador", "computador", estado.jogador.cartaSelecionada);
    realizarEfeito("computador", "jogador", estado.computador.cartaSelecionada);
  }

  if (estado.batalha.iniciado) {
    verEfeitosExtras();
    desenharCartao(cartaVazia, "jogador");
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
      girarCarta("carta-jogada-jogador", false);
      girarCarta("carta-jogada-computador", false);
      estado.vista.mensagemBatalha.textContent = "";
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

  console.log("Carta do PC", cartaComputador.nome);
  console.log("Carta do Jogador", cartaJogador.nome);

  estado.vista.cartaJogadorRosto.src = cartaJogador.img;
  estado.vista.cartaComputadorRosto.src = cartaComputador.img;

  setTimeout(() => girarCarta("carta-jogada-jogador", true), 1000);
  setTimeout(() => girarCarta("carta-jogada-computador", true), 1000);

  const resultado = verificarVitoria(cartaJogador.tipo, cartaComputador.tipo);

  setTimeout(
    () =>
      (estado.vista.mensagemBatalha.textContent = `${resultado.mensagem}! Jogador ${resultado.resultado}! `),
    1500
  );

  setTimeout(() => realizarResultado(resultado.resultado), 1500);

  //console.log("Resultado", resultado);
}

function jogar() {
  estado.telas.telaJogar.style.display = "none";
  estado.telas.telaBatalha.style.display = "flex";
  //console.log("carta em jogo: ", estado.jogador.cartaSelecionada);
  analisarCombate();
}

function desenharCartao(carta, jogadorAtual) {
  if (jogadorAtual === "computador" && estado.batalha.bloqueioBotaoProximo)
    return;

  estado.cartaoExibido.imagem.src = carta.img;
  estado.cartaoExibido.tipo.innerText = "Tipo: " + carta.tipo;
  estado.cartaoExibido.nome.innerText = "Nome: " + carta.nome;

  if (estado[jogadorAtual].bonusAtaque > 0) {
    estado.cartaoExibido.poder.innerText =
      "Poder : " +
      carta.poder +
      " + " +
      estado[jogadorAtual].bonusAtaque +
      "(Bônus)";
  } else {
    estado.cartaoExibido.poder.innerText = "Poder : " + carta.poder;
  }
  estado.cartaoExibido.efeito.innerText = "Efeito: " + carta.efeito;
}

function girarCarta(nome, rosto) {
  console.log(nome);
  const cartao = document.querySelector(`#${nome}`);
  if (rosto) {
    cartao.classList.add("girar");
  } else {
    cartao.classList.remove("girar");
  }
}

function buscarCarta(deck, id) {
  return deck.find((carta) => carta.id === id);
}

function atribuirCarta(carta, id, jogadorAtual) {
  carta.setAttribute("data-id", id);

  if (!estado.batalha.iniciado) {
    const dataId = Number(carta.getAttribute("data-id"));

    carta.addEventListener("mouseover", () => {
      desenharCartao(estado[jogadorAtual].deck[dataId], jogadorAtual);
      estado.telas.telaJogar.style.display = "none";
    });
    carta.addEventListener("mousedown", () => {
      desenharCartao(estado[jogadorAtual].deck[dataId], jogadorAtual);
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
    atribuirCarta(cartaDaRodada[i], i, "jogador");
  }

  const cartaDoPc = [
    estado.cartasEmCampo.carta6,
    estado.cartasEmCampo.carta7,
    estado.cartasEmCampo.carta8,
    estado.cartasEmCampo.carta9,
    estado.cartasEmCampo.carta10,
  ];

  for (let i = 0; i < 5; i++) {
    atribuirCarta(cartaDoPc[i], i, "computador");
  }
}

function teste() {
  console.log("teste");
  const carta = buscarCarta(cartas, 0);
}

function mostrarProximo(jogadorAtual) {
  const id = estado[jogadorAtual].deck[5].id;
  const carta = buscarCarta(estado[jogadorAtual].personagem.cartas, id);
  desenharCartao(carta, jogadorAtual);
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
  estado.batalha.bloqueioBotaoProximo = true;
  estado.vista.botaoBloqueado.setAttribute("disabled", "disabled");
  estado.vista.mensagemBatalha.textContent = "";
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
  desenharCartao(cartaVazia, "jogador");

  estado.telas.telaInicial.style.display = "none";
  estado.telas.telaJogo.style.display = "flex";

  estado.jogador.deck = embaralharDeck(estado.jogador.personagem.cartas);
  estado.computador.deck = embaralharDeck(estado.computador.personagem.cartas);

  //console.log("Deck Jogador: ", estado.jogador.deck);
  //console.log("Deck Computador: ", estado.computador.deck);

  definirCartas();

  estado.batalha.iniciado = true;
}
