import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the types for the context value
interface SidebarContextType {
  isOpen: boolean;
  toggleSidebar: () => void;
}

// Create the context with a default value of undefined
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// Define the provider props type
interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsOpen(prevIsOpen => !prevIsOpen);
  };

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Custom hook to use the SidebarContext
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};
