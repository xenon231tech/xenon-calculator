// error types

export interface Error {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ErrorResponse = {
  data: Error[];
  total: number;
};
