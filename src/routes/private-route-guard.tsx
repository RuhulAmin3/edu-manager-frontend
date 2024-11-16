import { FC, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { USER } from "../common/constants/local-storage.constant";
import { getFromLocalStorage } from "../common/utils/local-storage.utils";

// Define Role-Based Route Guard Props
interface PrivateRouteGuardProps {
  children: ReactNode;
  requiredRoles: string[];
}

const PrivateRouteGuard: FC<PrivateRouteGuardProps> = ({
  children,
  requiredRoles = [],
}) => {
  const location = useLocation();
  const user: Record<string, string> | null = getFromLocalStorage(USER); 
  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!requiredRoles.includes(user?.role)) {
    // Redirect to a Not Authorized page if user role doesn't match
    return <Navigate to="/not-authorized" replace />;
  }

  return <>{children}</>; // Render the route if user has required role
};

export default PrivateRouteGuard;
