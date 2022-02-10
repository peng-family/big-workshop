import { IDialog } from "../dialogModels";
export const peng1Dialog: IDialog = {
  layerName: "peng1",
  stepName: "peng1",
  sequence: [
    {
      rectangleName: "popupRectangle",
      speech:
        "Dear Peng, You are more than welcome in the PengVerse. A lot of things have changed and it's time for your to discover it. As an OGs you now have the possibility to complete your first quest. You have only one objective, be the first to send the code in discord. Are you ready ?",
      answers: [
        { answer: "Hell yeah" },
        { answer: "I prefer to wait !", buttonColor: "disabled", close: true },
      ],
    },
    {
      rectangleName: "popupRectangle",
      speech:
        "It's time to start, go see my green friend on the DeFi Island, he might have some information for you",
      answers: [{ answer: "Let's go Peng peng !" }],
    },
  ],
  alreadySeen: {
  rectangleName: "peng2Dialog",
  speech:
    "My fellow peng. We already talked together. Go on the DeFi Island and find the number 1.",
  answers: [{ answer: "Peng peng !" }],
  },
};
