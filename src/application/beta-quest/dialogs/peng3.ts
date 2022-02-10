import { IDialog } from "../dialogModels";
export const peng3Dialog: IDialog = {
  layerName: "peng3",
  stepName: "peng3",
  require: "peng2",
  sequence: [
    {
      rectangleName: "peng3Dialog",
      speech:
        "Nice to see you here, you've got the first digit, ready to find the second one ? ",
      answers: [
        { answer: "You bet I am" },
        { answer: "Need to rest a bit now", buttonColor: "error", close: true },
      ],
    },
    {
      rectangleName: "peng3Dialog",
      speech:
        "I see that you know this Island, but are you aware of what’s happening in this space. What is the last product launched by Trader Joe ?",
      answers: [
        { answer: "NFT Market place ", close: true },
        { answer: "A CEX ", close: true },
        { answer: "Rocket Joe" },
        { answer: "Lending protocol", close: true },
      ],
    },
    {
      rectangleName: "peng3Dialog",
      speech:
        "First you know DeFi and now ,all the fresh infos. Let me give you the second digit, but that won’t be that easy. The second digit is the first digit of the golden ratio. Now go and see my friend with an Orange T shirt on the NFT and Community Island",
      answers: [{ answer: "Got it Thanks !" }],
    },
  ],
  needPreviousStep: {
    rectangleName: "peng3Dialog",
    speech: "My fellow peng. You need to see the peng number 1 before me.",
    answers: [{ answer: "Peng peng ! Love u peng" }],
  },
  alreadySeen: {
    rectangleName: "peng3Dialog",
    speech:
      "My fellow peng. We already talked together. We are done.",
    answers: [{ answer: "Peng peng ! Love u" }],
  },
};
