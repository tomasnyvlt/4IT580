import jwtDecode, { JwtPayload } from "jwt-decode";
import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";

import { AuthContext } from "components/contexts/AuthContext";
import { useQuery } from "components/hooks/useQuery";
import { USER_QUERY } from "components/queries/user";
import { User as UserProps } from "components/types/graphql";

interface UserContextProps {
  user?: UserProps | undefined;
  setUser?: (user: UserProps | undefined) => void;
}

export const UserContext = createContext<UserContextProps>({});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProps>();
  const [userId, setUserId] = useState<string>();
  const authContext = useContext(AuthContext);

  const { data } = useQuery(USER_QUERY, {
    variables: {
      id_user: userId
    }
  });

  useEffect(() => {
    if (data && data.user) {
      setUser(data.user);
    }
  }, [data]);

  useEffect(() => {
    if (authContext.tokens?.accessToken) {
      const userIdToken = jwtDecode<JwtPayload & { id_user: string }>(authContext.tokens.accessToken as string).id_user;

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
