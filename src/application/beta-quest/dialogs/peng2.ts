import { IDialog } from "../dialogModels";
export const peng1Dialog: IDialog = {
  layerName: "peng2",
  sequence: [
    {
      rectangleName: "popupRectangle",
      speech: "Here you are, I was worried you could not find me. Are you ready to get the first digit of the code ?",
      answers: [
        { answer: "Yes let's go !" },
        { answer: "I am not ready", buttonColor: "error", close: true },
      ],
    },
    {
      rectangleName: "popupRectangle",
      speech: "Alright, but first you need to show me that you now this Island. The first question I have is about... BENQI ! Can you explain me what is this product ? ",
      answers: [
          { answer: "This is Decentralised Exchange, a DEX", close: true },
          { answer: "This is a liquidity market protocol" },
          { answer: "This is an NFT Project", close: true },
        ],
    },
    {
        rectangleName: "popupRectangle",
        speech: "Nice ! Congrats ! you are now ready to get the first number of the code, he it is : 2. Now, run to my yellow friend, he may help you ",
        answers: [
            { answer: "Thanks let's go !" }],
      },
    
  ],
};
