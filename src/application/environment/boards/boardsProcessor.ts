import { ButtonDescriptor } from "@workadventure/iframe-api-typings/Api/iframe/Ui/ButtonDescriptor";
import { IDialogAnswer } from "../dialogModels";
import Boards from "./list";

const WA = window.WA;
export const initializeBoardsEnv = async () => {
  let helloPeng: any;

  Boards.forEach((board) => {
    helloPeng = WA.room
      .onEnterLayer(`boards/${board.layerName}`)
      .subscribe(async () => {
        WA.controls.disablePlayerControls();
        if (board.dialog) {
          const boardInteraction = await dialoguePromise(
            board.dialog?.rectangleName,
            board.dialog?.speech,
            board.dialog?.answer
          );
        }
        WA.controls.restorePlayerControls();
      });

    WA.room.onLeaveLayer(`boards/${board.layerName}`).subscribe(() => {
      helloPeng.close();
    });
  });
};

let dialoguePromise = (
  rectangleName: string,
  speech: string,
  answers: IDialogAnswer[]
) =>
  new Promise((resolve, reject) => {
    const generatedAnswers: ButtonDescriptor[] = answers.map((answer) => {
      const _answer: ButtonDescriptor = {
        label: answer.answer,
        className: answer.buttonColor ? answer.buttonColor : "normal",
        callback: (popup) => {
          // Close the popup when the "Close" button is pressed.
          popup.close();
          if (answer.close) {
            reject(answer);
          } else {
            resolve(answer);
          }
        },
      };
      return _answer;
    });

    const popup = WA.ui.openPopup(rectangleName, speech, generatedAnswers);
  });
