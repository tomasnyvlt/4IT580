import jwtDecode, { JwtPayload } from "jwt-decode";
import { ReactNode, createContext, useEffect, useMemo, useState } from "react";

import { LoginTokens } from "components/types/graphql";
import { AUTH_TOKEN } from "config";

interface AuthContextProps {
  tokens: LoginTokens | undefined;
  setTokens?: (tokens: LoginTokens) => void;
}

export const AuthContext = createContext<AuthContextProps>({ tokens: { accessToken: "", refreshToken: "" } });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
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

  const userProviderValue: AuthContextProps = useMemo(() => {
    return {
      tokens,
      setTokens
    };
  }, [tokens, setTokens]);

  return <AuthContext.Provider value={userProviderValue}>{children}</AuthContext.Provider>;
};
