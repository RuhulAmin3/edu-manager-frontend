import { FC, PropsWithChildren, useEffect } from "react";
import { USER } from "../common/constants/local-storage.constant";
import { getFromLocalStorage } from "../common/utils/local-storage.utils";
import { useNavigate } from "react-router-dom";

const PublicRouteGuard: FC<PropsWithChildren> = ({ children }) => {
  const user: Record<string, string> | null = getFromLocalStorage(USER);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(`/${user.role.toLowerCase()}`, { replace: true });
    }
  }, [user, navigate]);

  // Render children only if the user is not logged in
  return !user ? <>{children}</> : null;
};

export default PublicRouteGuard;
