import superbowlImage from "./assets/superbowl.webp";
import chatvsdeepseekImage from "./assets/chatdeepseek.png";
import trumpImage from "./assets/trump.jpg";

export const pollsExample = [
  {
    id: 1,
    categoria: "Deportes",
    titulo: "¿Quién va a ganar el superbowl?",
    descripcion:
      "El 9 de Febrero termina la temporada de la NFL con el partido entre Philadelphia Eagles y Kansas City Chiefs en el  el Superdome de Caesers de Luisiana, participa en esta votación para averiguar que equipo cree la gente que ganará este gran juego!",
    tipo: "publica",
    fechaInicio: "2021-10-01",
    fechaFin: "2025-02-09",
    estado: "activa",
    imagen: superbowlImage,
  },
  {
    id: 2,
    categoria: "Tecnología",
    titulo: "Deepseek o chatgpt",
    descripcion:
      "Debido a la reciente publicación de deepseek, se ha puesto en duda cual es la mejor IA generativa, esta encuesta esta destinada para averiguarlo",
    tipo: "publica",
    fechaInicio: "2021-10-01",
    fechaFin: "2025-02-09",
    estado: "activa",
    imagen: chatvsdeepseekImage,
  },
  {
    id: 3,
    categoria: "Política",
    titulo: "Aranceles trump",
    descripcion:
      "En las últimas semanas se ha hablado mucho sobre los aranceles impuestos por Trump, ¿Crees que es una buena idea?",
    tipo: "publica",
    fechaInicio: "2021-10-01",
    fechaFin: "2025-02-09",
    estado: "activa",
    imagen: trumpImage,
  },
];
