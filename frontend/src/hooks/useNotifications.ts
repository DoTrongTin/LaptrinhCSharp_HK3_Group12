import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import api from "../services/api";
import type { NotificationDto } from "../types/notification";

const API_BASE_URL =
  import.meta.env.VITE_API_URL?.replace("/api", "") ?? "http://localhost:5078";

export function useNotifications() {
  const [unread, setUnread] = useState(0);
  const [notifications, setNotifications] = useState<NotificationDto[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const loadNotifications = async () => {
      try {
        const response = await api.get("/notifications");
        const data = response.data?.data ?? response.data ?? [];

        setNotifications(data);
        setUnread(data.filter((n: NotificationDto) => !n.isRead).length);
      } catch (error) {
        console.error("Load notifications failed:", error);
      }
    };

    loadNotifications();

    const conn = new signalR.HubConnectionBuilder()
      .withUrl(`${API_BASE_URL}/hubs/notifications`, {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .build();

    conn.on("ReceiveNotification", (notif: NotificationDto) => {
      setNotifications((prev) => [notif, ...prev]);
      setUnread((n) => n + 1);
    });

    conn.start().catch(console.error);

    return () => {
      conn.stop();
    };
  }, []);

  const markAsRead = async (id: string) => {
    try {
      await api.put(`/notifications/${id}/read`);

      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === id
            ? { ...notification, isRead: true }
            : notification
        )
      );

      setUnread((current) => Math.max(0, current - 1));
    } catch (error) {
      console.error("Mark notification as read failed:", error);
    }
  };

  const clearUnread = () => setUnread(0);

  return {
    unread,
    notifications,
    markAsRead,
    clearUnread,
  };
}