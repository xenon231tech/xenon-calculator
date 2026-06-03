// common types

export interface Common {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CommonResponse = {
  data: Common[];
  total: number;
};
