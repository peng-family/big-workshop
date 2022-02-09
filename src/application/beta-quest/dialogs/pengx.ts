import { IDialog } from "../dialogModels";
export const pengxDialog: IDialog = {
  layerName: "pengx",
  stepName: "pengx",
  needPreviousStep: {
    rectangleName: "pengxDialog",
    speech: "Go ot see the first peng !",
    answers: [{ answer: "peng peng !", close: true }],
  },
  sequence: [
    {
      rectangleName: "pengxDialog",
      speech: "Peng peng my fellow peng !",
      answers: [{ answer: "peng peng !" }, { answer: "peng..", close: true }],
    },
    {
      rectangleName: "pengxDialog",
      speech: "I am the second peng ! \n And the real quest start right now !",
      answers: [{ answer: "Peng !" }],
    },
  ],
};
