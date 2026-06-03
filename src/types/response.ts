// response types

export interface Response {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ResponseResponse = {
  data: Response[];
  total: number;
};
