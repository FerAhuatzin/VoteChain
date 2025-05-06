import { Image } from "react-native";
import superbowlImage from "./assets/superbowl.webp";
import chatvsdeepseekImage from "./assets/chatdeepseek.png";
import trumpImage from "./assets/trump.jpg";
import snoopy from "./assets/snoopy.jpg";

export const pollsExample = [
  {
    id: 1,
    idUsuarioCreador: 1,
    categoria: "Deportes",
    titulo: "¿Quién va a ganar el superbowl?",
    descripcion:
      "El 9 de Febrero termina la temporada de la NFL con el partido entre Philadelphia Eagles y Kansas City Chiefs en el  el Superdome de Caesers de Luisiana, participa en esta votación para averiguar que equipo cree la gente que ganará este gran juego!",
    tipo: "publica",
    fechaInicio: "2021-10-01",
    fechaFin: "2025-02-09",
    estado: "activa",
    imagen: Image.resolveAssetSource(superbowlImage).uri,
  },
  {
    id: 2,
    idUsuarioCreador: 1,
    categoria: "Tecnologia",
    titulo: "Deepseek o chatgpt",
    descripcion:
      "Debido a la reciente publicación de deepseek, se ha puesto en duda cual es la mejor IA generativa, esta encuesta esta destinada para averiguarlo",
    tipo: "publica",
    fechaInicio: "2021-10-01",
    fechaFin: "2025-02-09",
    estado: "activa",
    imagen: Image.resolveAssetSource(chatvsdeepseekImage).uri,
  },
  {
    id: 3,
    idUsuarioCreador: 1,
    categoria: "Politica",
    titulo: "Aranceles trump",
    descripcion:
      "En las últimas semanas se ha hablado mucho sobre los aranceles impuestos por Trump, ¿Crees que es una buena idea?",
    tipo: "publica",
    fechaInicio: "2021-10-01",
    fechaFin: "2025-02-09",
    estado: "activa",
    imagen: Image.resolveAssetSource(trumpImage).uri,
  },
];

export const votesExample = [
  {idVotacion: 1,
    opciones: [
      {
        descripcion: "Eagles",
        votos: 100430
      },
      {
        descripcion: "Kansas City Chiefs",
        votos: 100427
      }
    ]
  },
  {idVotacion: 2,
    opciones: [
      {
        descripcion: "Deepseek",
        votos: 500
      },
      {
        descripcion: "ChatGPT",
        votos: 800
      }
    ]
  },
  {idVotacion: 3,
    opciones: [
      {
        descripcion: "A favor",
        votos: 120
      },
      {
        descripcion: "En contra",
        votos: 800
      }
    ]
  }
  
];


export const userExample = {
  id: 1,
  nombre: "Fer Ahuatzin",
  edad: 21,
  email: "f126ag@gmail.com",
  contraseña: "Hola123",
  fechaRegistro: "12/12/2021",
  imagen: Image.resolveAssetSource(snoopy).uri,
};