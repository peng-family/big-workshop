import { IDialog } from "../dialogModels";
export const peng2Dialog: IDialog = {
  layerName: "peng2",
  stepName: "peng2",
  require: "peng1",
  sequence: [
    {
      rectangleName: "peng2Dialog",
      speech:
        "Here you are, I was worried you could not find me. Are you ready to get the first digit of the code ?",
      answers: [
        { answer: "Yes let's go !" },
        { answer: "I am not ready", buttonColor: "error", close: true },
      ],
    },
    {
      rectangleName: "peng2Dialog",
      speech:
        "Alright, but first you need to show me that you now this Island. The first question I have is about... BENQI ! Can you explain me what is this product ? ",
      answers: [
        { answer: "This is Decentralised Exchange, a DEX", close: true },
        { answer: "This is a liquidity market protocol" },
        { answer: "This is an NFT Project", close: true },
      ],
    },
    {
      rectangleName: "peng2Dialog",
      speech:
        "Nice ! Congrats ! you are now ready to get the first number of the code, he it is : 2. Now, run to my yellow friend, he may help you ",
      answers: [{ answer: "Thanks let's go !" }],
    },
  ],
  needPreviousStep: {
    rectangleName: "peng2Dialog",
    speech: "My fellow peng. You need to see the first peng before me.",
    answers: [{ answer: "Peng peng !" }],
  },
  alreadySeen: {
    rectangleName: "peng2Dialog",
    speech:
      "My fellow peng. We already talked together. go to see the third peng.",
    answers: [{ answer: "Peng peng !" }],
  },
};
