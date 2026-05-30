export interface NotificationDto {
  id: string;
  type: "share" | "follow" | "like";
  payload: string;
  isRead: boolean;
  createdAt: string;
}
