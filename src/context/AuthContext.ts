import { createContext, useContext } from "react";
import { Auth } from "../models/types";

export const AuthContext = createContext<Auth | undefined>(undefined);

export function useAuthContext() {
  const auth = useContext(AuthContext);

  if (auth === undefined) {
    throw new Error("useAuthContext must be used within an AuthContext");
  }

  return auth;
}
