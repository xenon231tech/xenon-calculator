// request types

export interface Request {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export type RequestResponse = {
  data: Request[];
  total: number;
};
