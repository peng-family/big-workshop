import { IDialog } from "../dialogModels";
export const peng3Dialog: IDialog = {
  layerName: "peng3",
  stepName: "peng3",
  require: "peng2",
  sequence: [
    {
      rectangleName: "dialog3",
      speech: "OMG, what are you doing here ?",
      answers: [
        { answer: "Looking for the seconde number dude!" },
        { answer: "I have f**ing idea", buttonColor: "error", close: true },
      ],
    },
    {
      rectangleName: "dialog3",
      speech: "Now I feel better, it is time to check if you now the Peng Fam project. The second numer of the code is equal to the number of different types of totem !",
      answers: [
          { answer: "What ?", close: true },
          { answer: "Ok, i have it" },
        ],
    },
    
  ],
};
