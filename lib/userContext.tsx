import { createContext } from "react";

interface UserContextProps {
  user: {
    photoURL?: string;
    uid?: string;
    displayName?: string;
  };
  username: string | undefined;
}

export const UserContext = createContext<UserContextProps>({
  user: {},
  username: undefined,
});
