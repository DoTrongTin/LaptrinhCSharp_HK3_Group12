export interface MediaItem {
  id: string;
  title: string;
  description?: string;
  mediaType: "audio" | "video";
  duration: number;
  thumbnailPath?: string;
  isPublic: boolean;
  ownerId: string;
  ownerName: string;
  createdAt: string;
}
