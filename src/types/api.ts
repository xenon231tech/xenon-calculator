// api types

export interface Api {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ApiResponse = {
  data: Api[];
  total: number;
};
