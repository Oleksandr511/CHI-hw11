import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { RootState } from "./store/store";
import { ReactNode, useEffect } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isLogged = useSelector((state: RootState) => state.user.isLogged);
  const router = useRouter();

  useEffect(() => {
    console.log("ProtectedRoute", isLogged);
    if (isLogged === false) {
      router.push("/login");
    }
  }, [isLogged, router]);

  return isLogged ? <>{children}</> : null; // Render children if logged in
};

export default ProtectedRoute;
