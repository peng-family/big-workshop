import { IDialog } from "../dialogModels";
export const peng1Dialog: IDialog = {
  layerName: "peng1",
  sequence: [
    {
      rectangleName: "popupRectangle",
      speech: "Peng peng my fellow peng !",
      answers: [
        { answer: "peng peng !" },
        { answer: "peng my peng !", buttonColor: "success" },
        { answer: "Have a good peng !", buttonColor: "primary" },
        { answer: "peng disabled !", buttonColor: "disabled", close: true },
        { answer: "Well peng.", buttonColor: "warning", close: true },
        { answer: "peng.", buttonColor: "error", close: true },
      ],
    },
    {
      rectangleName: "popupRectangle",
      speech: "I have a quest for you !",
      answers: [{ answer: "Peng !" }],
    },
  ],
};
