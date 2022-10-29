import jwtDecode, { JwtPayload } from "jwt-decode";
import { ReactNode, createContext, useEffect, useMemo, useState } from "react";

import { LoginTokens } from "components/types/graphql";
import { AUTH_TOKEN } from "config";

export interface UserProps {
  name: string;
  surname: string;
  email: string;
}

interface UserContextProps {
  user?: UserProps | undefined;
  setUser?: (user: UserProps | undefined) => void;
  tokens: LoginTokens | undefined;
  setTokens?: (tokens: LoginTokens) => void;
}

export const UserContext = createContext<UserContextProps>({ tokens: { accessToken: "", refreshToken: "" } });

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProps>();
  const [tokens, setTokens] = useState<LoginTokens | undefined>({ accessToken: "", refreshToken: "" });

  useEffect(() => {
    if (localStorage?.getItem(AUTH_TOKEN)) {
      setTokens({ refreshToken: "", accessToken: localStorage!.getItem(AUTH_TOKEN)!.toString() });
    } else {
      setTokens(undefined);
    }
  }, []);

  useEffect(() => {
    if (tokens?.accessToken) {
      const expiration = jwtDecode<JwtPayload>(tokens.accessToken as string).exp;

      if (new Date() < new Date((expiration as number) * 1000)) {
        // token vypršel
      }
    }
  }, [tokens]);

  const userProviderValue: UserContextProps = useMemo(() => {
    return {
      user,
      setUser,
      tokens,
      setTokens
    };
  }, [user, setUser, tokens, setTokens]);

  return <UserContext.Provider value={userProviderValue}>{children}</UserContext.Provider>;
};
