'use client';
import { createContext, useContext, useState } from 'react';

interface homeTypes {
  openSidePanel: boolean;
  setOpenSidePanel: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<homeTypes>({
  openSidePanel: false,
  setOpenSidePanel: () => {},
});

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [openSidePanel, setOpenSidePanel] = useState(false);
  return <AppContext.Provider value={{ openSidePanel, setOpenSidePanel }}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
