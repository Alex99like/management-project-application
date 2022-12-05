export interface IColumnReq {
  title: string;
}

export interface IColumn extends IColumnReq {
  id: string;
  order: number;
}
