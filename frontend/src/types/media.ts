export interface MediaItem {
  id: string;
  title: string;
  duration?: number;
  thumbnailPath: string | null;
  
  ownerName?:string;
  artistName?: string; 
  
  filePath?: string;
  previewUrl?:string;   
  
  description?: string;
  mediaType?: number;
  createdAt?: string;
  isDeleted?:boolean ;
}