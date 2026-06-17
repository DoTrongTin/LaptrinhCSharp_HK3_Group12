export interface MediaItem {
  id: string;
  title: string;
  duration: number;
  thumbnailPath: string | null;
  ownerName: string;
  filePath?: string;
  description?: string;
  mediaType?: number;
  createdAt?: string;
  previewUrl?: string;
}