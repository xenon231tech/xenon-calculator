// user types

export interface User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UserResponse = {
  data: User[];
  total: number;
};
