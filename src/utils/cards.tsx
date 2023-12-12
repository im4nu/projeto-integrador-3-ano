import { Blur, BoxSearch, EmojiSad } from "iconsax-react";

export const cardsData = [
  {
    id: 0,
    icon: <Blur size="32" color="#4D77FF" variant="TwoTone" />,
    title: "Fora do grupo de risco",
    description:
      "Pessoas mais jovens e saudáveis, sem condições crônicas significativas, que têm menor probabilidade de enfrentar complicações graves em casos de infecções respiratórias. No entanto, a adoção de medidas preventivas é fundamental para todos.",
  },

  {
    id: 1,
    icon: <BoxSearch size="32" color="#4D77FF" variant="TwoTone" />,
    title: "Grupo de BAIXO risco",
    description:
      "Indivíduos com maior probabilidade de desenvolver sintomas leves de infecções respiratórias, como tosse e febre, mas que não apresentam risco de vida.",
  },

  {
    id: 2,
    icon: <EmojiSad size="32" color="#4D77FF" variant="TwoTone" />,
    title: "Grupo de ALTO risco",
    description:
      "Indivíduos mais suscetíveis a complicações graves de síndrome respiratória aguda, como idosos e aqueles com doenças crônicas, devido à fragilidade do sistema imunológico.",
  },
];
