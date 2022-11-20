import jwtDecode, { JwtPayload } from "jwt-decode";
import { useRouter } from "next/router";
import { ReactNode, createContext, useEffect, useMemo, useState } from "react";

import { AUTH_TOKEN } from "config";
import { LoginTokens } from "types/generated-types";

interface AuthContextProps {
  tokens: LoginTokens | undefined;
  setTokens?: (tokens: LoginTokens) => void;
}

export const AuthContext = createContext<AuthContextProps>({ tokens: { accessToken: "", refreshToken: "" } });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [tokens, setTokens] = useState<LoginTokens | undefined>({ refreshToken: "", accessToken: "" });
  const router = useRouter();

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

      if (new Date() > new Date((expiration as number) * 1000)) {
        router.push("/sign-in");
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
