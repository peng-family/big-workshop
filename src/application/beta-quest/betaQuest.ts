import { ButtonDescriptor } from "@workadventure/iframe-api-typings/Api/iframe/Ui/ButtonDescriptor";
import { IDialogAnswer } from "./dialogModels";
import Dialogs from "./dialogs";

const WA = window.WA;
export const initializeBetaQuest = async () => {
  const alreadySeen = new Set<string>();
  let helloPeng: any;

  Dialogs.forEach((dialog) => {
    helloPeng = WA.room
      .onEnterLayer(`betaQuest/${dialog.layerName}`)
      .subscribe(async () => {
        let continueDialogue = true;
        WA.controls.disablePlayerControls();
        if (!alreadySeen.has(dialog.stepName)) {
          if (
            !dialog.require ||
            (dialog.require && alreadySeen.has(dialog.require))
          ) {
            for (let i = 0; i < dialog.sequence.length; i++) {
              
              if (continueDialogue) {
                await dialoguePromise(
                  dialog.sequence[i].rectangleName,
                  dialog.sequence[i].speech,
                  dialog.sequence[i].answers
                ).catch(() => {
                  continueDialogue = false;
                });
                if (i === dialog.sequence.length - 1) {
                  alreadySeen.add(dialog.stepName);
                }
              }
            }
          } else if (
            dialog.require &&
            !alreadySeen.has(dialog.require) &&
            dialog.needPreviousStep
          ) {
            await dialoguePromise(
              dialog.needPreviousStep?.rectangleName,
              dialog.needPreviousStep?.speech,
              dialog.needPreviousStep?.answers
            ).catch(() => {
              continueDialogue = false;
            });
          }
        } else if (dialog.alreadySeen) {
          await dialoguePromise(
            dialog.alreadySeen?.rectangleName,
            dialog.alreadySeen?.speech,
            dialog.alreadySeen?.answers
          ).catch(() => {
            continueDialogue = false;
          });
        }
        WA.controls.restorePlayerControls();
      });

    WA.room.onLeaveLayer(`betaQuest/${dialog.layerName}`).subscribe(() => {
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
