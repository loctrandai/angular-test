export enum Process {
  open,
  inprocess,
  complete,
  invalid
}

export interface Task {
  id: number;
  name: string;
  descriptions: string;
  assigner: string;
  process: Process
}