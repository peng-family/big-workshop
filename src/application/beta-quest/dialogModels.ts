export interface IDialogAnswer {
  answer: string;
  buttonColor?:
    | "normal"
    | "primary"
    | "success"
    | "warning"
    | "error"
    | "disabled";
  close?: boolean;
}

export interface IDialogSequence {
  rectangleName: string;
  speech: string;
  answers: IDialogAnswer[];
}

export interface IDialog {
  layerName: string;
  sequence: IDialogSequence[];
  goFuckYourself?: IDialogSequence;
}
