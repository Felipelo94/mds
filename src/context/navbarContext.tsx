import React, { createContext, useState, ReactNode, useContext } from "react";

interface NavbarContextProps {
  value: string;
  setValue: (value: string) => void;
}

export const NavbarContext = createContext<NavbarContextProps | undefined>(
  undefined
);

interface NavbarProviderProps {
  children: ReactNode;
}

export const NavbarProvider: React.FC<NavbarProviderProps> = ({ children }) => {
  const [value, setValue] = useState<string>("");

  return (
    <NavbarContext.Provider value={{ value, setValue }}>
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbarContext = () => {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error("useNavbarContext must be used within a NavbarProvider");
  }
  return context;
};
