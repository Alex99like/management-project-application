export interface IBoardReq {
  title: string;
  description: string;
}

export interface IBoard extends IBoardReq {
  id: string;
}
