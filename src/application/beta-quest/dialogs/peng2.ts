import { IDialog } from "../dialogModels";
export const peng2Dialog: IDialog = {
  layerName: "peng2",
  goFuckYourself: {
    rectangleName: "peng2Dialog",
    speech: "Go ot see the first peng !",
    answers: [{ answer: "peng peng !", close: true }],
  },
  sequence: [
    {
      rectangleName: "peng2Dialog",
      speech: "Peng peng my fellow peng !",
      answers: [{ answer: "peng peng !" }, { answer: "peng..", close: true }],
    },
    {
      rectangleName: "peng2Dialog",
      speech: "I am the second peng ! \n And the real quest start right now !",
      answers: [{ answer: "Peng !" }],
    },
  ],
};
