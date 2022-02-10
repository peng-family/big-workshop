import { IDialog } from "../dialogModels";
export const peng5Dialog: IDialog = {
  layerName: "peng5",
  stepName: "peng5",
  require: "peng4",
  sequence: [
    {
      rectangleName: "peng5Dialog",
      speech:
        "Do you enjoy the music ? Take some time to enjoy peng ! ",
      answers: [
        { answer: "Good vibes, I like it" },
        { answer: "Ok give me some time", buttonColor: "error", close: true },
      ],
    },
    {
      rectangleName: "peng5Dialog",
      speech:
        "Do you like this tavern? When the metaverse is available you will have access, but now let’s get to my question; What is the AVAX Apes supply",
      answers: [
        { answer: "5555", close: true },
        { answer: "10 000" },
        { answer: "8888", close: true  },
        { answer: "20 000", close: true },
      ],
    },
    {
      rectangleName: "peng5Dialog",
      speech:
        "Alright, you will get the forth digit. This is the first digit of one of our admin. Do you think it would be easy all day long ? Check discord to find it. Now you can go see my friend in the community Island",
      answers: [{ answer: "Got it Thanks !" }],
    },
  ],
  needPreviousStep: {
    rectangleName: "peng5Dialog",
    speech: "My fellow peng. You need to see the peng number 3 before me.",
    answers: [{ answer: "Peng peng ! Love u peng" }],
  },
  alreadySeen: {
    rectangleName: "peng5Dialog",
    speech:
      "My fellow peng. Go visit the Island",
    answers: [{ answer: "Peng peng ! Love u" }],
  },
};