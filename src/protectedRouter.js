import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { AuthenContext } from "./component/main/contexts/AuthenContext";

const ProtectedRoute = ({ component: Component }) => {
  const { authState, fixed_token, LOCAL_STORAGE_TOKEN_NAME } =
    useContext(AuthenContext);
  const navigate = useNavigate();

  let objauth = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)
    ? JSON.parse(atob(localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)))
    : null;

  useEffect(() => {
    let time = Math.floor(new Date().getTime() / 1000);
    if (
      authState.isAuthenticated &&
      objauth &&
      objauth.token !== fixed_token &&
      objauth.expirationTime <= time
    ) {
      // navigate("/", { replace: true });
      let path = window.location.pathname;
      if (path !== "/")
        navigate(
          {
            pathname: "/",
            search: `Next=${path}`,
          },
          { replace: true }
        );
    }
  }, []);

  return <Component />;
};

export default ProtectedRoute;
