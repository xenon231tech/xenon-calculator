// notification types

export interface Notification {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export type NotificationResponse = {
  data: Notification[];
  total: number;
};
