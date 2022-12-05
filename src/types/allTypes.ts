export type TestBoard = {
  id: string;
  title: string;
  description: string;
  columns: TestColumns[];
};

export type TestColumns = {
  id: string;
  title: string;
  order: number;
  tasks: TestTasks[];
};

export type TestTasks = {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
};
