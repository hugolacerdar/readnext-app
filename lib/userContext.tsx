import { createContext } from "react";

interface UserContextProps {
  user: {
    photoURL?: string;
  };
  username: string | undefined;
}

export const UserContext = createContext<UserContextProps>({
  user: {},
  username: undefined,
});
