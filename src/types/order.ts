// order types

export interface Order {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export type OrderResponse = {
  data: Order[];
  total: number;
};
