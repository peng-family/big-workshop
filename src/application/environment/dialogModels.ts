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
  answer: IDialogAnswer[];
}

export interface IBoard {
  layerName: string;
  dialog?: IDialogSequence;
}
