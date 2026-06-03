// payment types

export interface Payment {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export type PaymentResponse = {
  data: Payment[];
  total: number;
};
