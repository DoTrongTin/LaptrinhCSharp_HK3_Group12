import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import type { NotificationDto } from "../types/notification";

export function useNotifications() {
  const [unread, setUnread] = useState(0);
  const [notifications, setNotifications] = useState<NotificationDto[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const conn = new signalR.HubConnectionBuilder()
      .withUrl(`${import.meta.env.VITE_API_URL?.replace("/api", "") ?? "http://localhost:5000"}/hubs/notifications`,
        { accessTokenFactory: () => token })
      .withAutomaticReconnect()
      .build();

    conn.on("ReceiveNotification", (notif: NotificationDto) => {
      setNotifications((prev) => [notif, ...prev]);
      setUnread((n) => n + 1);
    });

    conn.start().catch(console.error);
    return () => { conn.stop(); };
  }, []);

  return { unread, notifications, clearUnread: () => setUnread(0) };
}
