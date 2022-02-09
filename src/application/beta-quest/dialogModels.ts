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
  stepName: string;
  require?: string;
  sequence: IDialogSequence[];
  needPreviousStep?: IDialogSequence;
  alreadySeen?: IDialogSequence;
}
