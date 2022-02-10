import { IDialog } from "../dialogModels";
export const peng7Dialog: IDialog = {
  layerName: "peng7",
  stepName: "peng7",
  require: "peng6",
  sequence: [
    {
      rectangleName: "peng7Dialog",
      speech:
        "This is the last question you will have, are you ready for it ?",
      answers: [
        { answer: "I need that last digit" },
        { answer: "Let me just go around", buttonColor: "error", close: true },
      ],
    },
    {
      rectangleName: "peng7Dialog",
      speech:
        "You are quite close to the end, now we need to discuss about AventuresDAO, but please first explain me what is a DAO",
      answers: [
        { answer: "Decentralized Augmented Organisation", close: true },
        { answer: "Decentralized Autonomous Organisation" },
        { answer: "DeFi Augmented Organisation", close: true  },
      ],
    },
    {
      rectangleName: "peng7Dialog",
      speech:
        "Ok, you will have the last number….. I forgot it, ask one of the admin on Discord",
      answers: [{ answer: "Let's go !" }],
    },
  ],
  needPreviousStep: {
    rectangleName: "peng7Dialog",
    speech: "My fellow peng. You need to see the peng number 4 before me.",
    answers: [{ answer: "Peng peng ! Love u peng" }],
  },
  alreadySeen: {
    rectangleName: "peng7Dialog",
    speech:
      "My fellow peng. Go visit the Island",
    answers: [{ answer: "Peng peng ! Love u" }],
  },
};