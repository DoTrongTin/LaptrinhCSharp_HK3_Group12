export interface NotificationDto {
  id: string;
  userId: string;
  type: string;
  payload: string;
  isRead: boolean;
  createdAt: string;
}