"use client"
import { createContext, ReactNode, useState } from 'react';

interface UserContextProps {
  user: any; // Ajusta el tipo según tus necesidades
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

export const UserContext = createContext({} as UserContextProps);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
