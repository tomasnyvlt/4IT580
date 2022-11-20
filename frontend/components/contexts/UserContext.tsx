import jwtDecode, { JwtPayload } from "jwt-decode";
import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";

import { AuthContext } from "components/contexts/AuthContext";
import { UserQuery, useUserQuery } from "types/generated-types";

interface UserContextProps {
  user?: UserQuery | undefined;
  setUser?: (user: UserQuery | undefined) => void;
}

export const UserContext = createContext<UserContextProps>({});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserQuery>();
  const [userId, setUserId] = useState<number>();
  const authContext = useContext(AuthContext);

  const { data } = useUserQuery({
    variables: {
      id_user: userId ?? 0
    }
  });

  useEffect(() => {
    if (data && data.user) {
      setUser(data);
    }
  }, [data]);

  useEffect(() => {
    if (authContext.tokens?.accessToken) {
      const userIdToken = jwtDecode<JwtPayload & { id_user: number }>(authContext.tokens.accessToken as string).id_user;

      setUserId(userIdToken);
    }
  }, [authContext]);

  const userProviderValue: UserContextProps = useMemo(() => {
    return {
      user,
      setUser
    };
  }, [user, setUser]);

  return <UserContext.Provider value={userProviderValue}>{children}</UserContext.Provider>;
};
