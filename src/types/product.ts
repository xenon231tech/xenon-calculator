// product types

export interface Product {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ProductResponse = {
  data: Product[];
  total: number;
};
