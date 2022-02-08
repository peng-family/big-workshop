import { ButtonDescriptor } from "@workadventure/iframe-api-typings/Api/iframe/Ui/ButtonDescriptor";
import { IDialogAnswer } from "./dialogModels";
import Dialogs from "./dialogs";

const WA = window.WA;
export const initializeBetaQuest = async () => {
  let popupIsOpen = false;
  let helloPeng: any;

  Dialogs.forEach((dialog) => {
    helloPeng = WA.room
      .onEnterLayer(`betaQuest/${dialog.layerName}`)
      .subscribe(async () => {
        let continueDialogue = true;
        for (let i = 0; i < dialog.sequence.length; i++) {
          WA.controls.disablePlayerControls();
          if (continueDialogue) {
            popupIsOpen = true;
            await dialoguePromise(
              dialog.sequence[i].rectangleName,
              dialog.sequence[i].speech,
              dialog.sequence[i].answers
            ).catch(() => {
              continueDialogue = false;
            });
          }
        }
        WA.controls.restorePlayerControls();
      });

    WA.room.onLeaveLayer(`betaQuest/${dialog.layerName}`).subscribe(() => {
      console.log("leaving");
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
