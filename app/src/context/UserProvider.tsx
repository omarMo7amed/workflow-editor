"use client";

import React, { createContext, useContext, useState } from "react";

export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
} | null;

type UserContextValue = {
  user: User;
  clearUser: () => void;
  setUser: (user: User) => void;
};

const UserContext = createContext<UserContextValue | null>(null);

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export default function UserProvider({
  initialUser,
  children,
}: {
  initialUser: User;
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User>(initialUser);

  const clearUser = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, clearUser, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
