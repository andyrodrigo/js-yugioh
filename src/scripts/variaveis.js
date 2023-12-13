const pathImages = "./src/assets/icons/";

const resultados = {
  Pedra: {
    vence: ["Tesoura", "Lagarto"],
    mensagem1: "Pedra esmaga Tesoura",
    mensagem2: "Pedra esmaga Lagarto",
  },
  Papel: {
    vence: ["Pedra", "Spock"],
    mensagem1: "Papel cobre Pedra",
    mensagem2: "Papel desqualifica Spock",
  },
  Tesoura: {
    vence: ["Papel", "Lagarto"],
    mensagem1: "Tesoura corta Papel",
    mensagem2: "Tesoura decapita Lagarto",
  },
  Lagarto: {
    vence: ["Papel", "Spock"],
    mensagem1: "Lagarto come Papel",
    mensagem2: "Lagarto envenena Spock",
  },
  Spock: {
    vence: ["Pedra", "Tesoura"],
    mensagem1: "Spock vaporiza Pedra",
    mensagem2: "Spock quebra Tesoura",
  },
};

const cartas = [
  {
    id: 0,
    nome: "Dragão Branco de Olhos azuis",
    tipo: "Lagarto",
    img: `${pathImages}dragon.png`,
    poder: 900,
    efeito: "Nenhum",
  },
  {
    id: 1,
    nome: "Mago Negro",
    tipo: "Spock",
    img: `${pathImages}magician.png`,
    poder: 800,
    efeito: "Nenhum",
  },
  {
    id: 2,
    nome: "Exodia",
    tipo: "Pedra",
    img: `${pathImages}exodia.png`,
    poder: 400,
    efeito: "Aumenta o poder a cada turno em campo",
  },
  {
    id: 3,
    nome: "Rei Caveira",
    tipo: "Papel",
    img: `${pathImages}exodia.png`,
    poder: 650,
    efeito: "Nenhum",
  },
  {
    id: 4,
    nome: "Guardião Celta",
    tipo: "Tesoura",
    img: `${pathImages}exodia.png`,
    poder: 600,
    efeito: "Nenhum",
  },
  {
    id: 5,
    nome: "Dragão Branco de Olhos azuis",
    tipo: "Lagarto",
    img: `${pathImages}dragon.png`,
    poder: 900,
    efeito: "Nenhum",
  },
  {
    id: 6,
    nome: "Mago Negro",
    tipo: "Spock",
    img: `${pathImages}magician.png`,
    poder: 800,
    efeito: "Nenhum",
  },
  {
    id: 7,
    nome: "Exodia",
    tipo: "Pedra",
    img: `${pathImages}exodia.png`,
    poder: 400,
    efeito: "Aumenta o poder a cada turno em campo",
  },
  {
    id: 8,
    nome: "Rei Caveira",
    tipo: "Papel",
    img: `${pathImages}exodia.png`,
    poder: 650,
    efeito: "Nenhum",
  },
  {
    id: 9,
    nome: "Guardião Celta",
    tipo: "Tesoura",
    img: `${pathImages}exodia.png`,
    poder: 600,
    efeito: "Nenhum",
  },
  {
    id: 10,
    nome: "Dragão Branco de Olhos azuis",
    tipo: "Lagarto",
    img: `${pathImages}dragon.png`,
    poder: 900,
    efeito: "Nenhum",
  },
  {
    id: 11,
    nome: "Mago Negro",
    tipo: "Spock",
    img: `${pathImages}magician.png`,
    poder: 800,
    efeito: "Nenhum",
  },
  {
    id: 12,
    nome: "Exodia",
    tipo: "Pedra",
    img: `${pathImages}exodia.png`,
    poder: 400,
    efeito: "Aumenta o poder a cada turno em campo",
  },
  {
    id: 13,
    nome: "Rei Caveira",
    tipo: "Papel",
    img: `${pathImages}exodia.png`,
    poder: 650,
    efeito: "Nenhum",
  },
  {
    id: 14,
    nome: "Guardião Celta",
    tipo: "Tesoura",
    img: `${pathImages}exodia.png`,
    poder: 600,
    efeito: "Nenhum",
  },
];

const yugi = {
  cartas: cartas,
};

const estado = {
  telas: {
    telaInicial: document.getElementById("tela-inicial"),
    telaJogo: document.getElementById("tela-jogo"),
    telaJogar: document.getElementById("jogar"),
    telaBatalha: document.getElementById("batalha"),
  },
  cartaoExibido: {
    imagem: document.getElementById("carta-imagem"),
    nome: document.getElementById("carta-nome"),
    tipo: document.getElementById("carta-tipo"),
    poder: document.getElementById("carta-poder"),
    efeito: document.getElementById("carta-efeito"),
    cartaSelecionada: document.getElementById("carta-selecionada"),
  },
  cartasEmCampo: {
    carta1: document.getElementById("carta-jogador-1"),
    carta2: document.getElementById("carta-jogador-2"),
    carta3: document.getElementById("carta-jogador-3"),
    carta4: document.getElementById("carta-jogador-4"),
    carta5: document.getElementById("carta-jogador-5"),
  },
  jogador: {
    personagem: yugi,
    energia: 2000,
    efeitos: [],
  },
  computador: {
    personagem: yugi,
    energia: 2000,
    efeitos: [],
  },
  batalha: {
    turno: 1,
    posicaoDeck: 0,
    iniciado: false,
    selecionadoJogador: undefined,
  },
};
