// AppContext.tsx
import React, { createContext, useContext, useState } from 'react';

// Định nghĩa kiểu dữ liệu cho mục đang chọn hiển thị bên phải
interface RightPanelState {
  title: string;
  artist: string;
  cover: string;
  type: 'song' | 'artist';
}

interface AppContextType {
  rightPanelData: RightPanelState | null;
  setRightPanelData: (data: RightPanelState | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [rightPanelData, setRightPanelData] = useState<RightPanelState | null>(null);

  return (
    <AppContext.Provider value={{ rightPanelData, setRightPanelData }}>
      {children}
    </AppContext.Provider>
  );
};

// Đảm bảo có chữ "export" ở đầu hàm và đúng chính tả "useAppContext"
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};