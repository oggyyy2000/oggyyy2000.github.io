import { createContext, useReducer, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { authReducer } from "../reducers/authReducer";
import { info } from "../../account/info.json";

export const AuthenContext = createContext();

const AuthenContextProvider = ({ children }) => {
  const logoutTimerIdRef = useRef(null);
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  });

  const navigate = useNavigate();
  const LOCAL_STORAGE_TOKEN_NAME = "Token";
  const fixed_token = "Ne43ZyMMGsml9ALLkcEiWPYTR8lg3nMZ";

  // Authenticate user
  const loadUser = async () => {
    try {
      let objauth = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)
        ? JSON.parse(atob(localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)))
        : null;
      if (objauth && objauth.token === fixed_token) {
        dispatch({
          type: "SET_AUTH",
          payload: { isAuthenticated: true, user: info },
        });
      } else {
        dispatch({
          type: "SET_AUTH",
          payload: { isAuthenticated: false, user: null },
        });
        LogOut();
      }
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      dispatch({
        type: "SET_AUTH",
        payload: { isAuthenticated: false, user: null },
      });
      // navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    if (authState.isAuthenticated) {
      navigate(params.Next ? params.Next : "/app/trangchu", { replace: true });
    } else {
      let path = window.location.pathname;
      if (path != "/")
        navigate(
          {
            pathname: "/",
            search: `Next=${path}`,
          },
          { replace: true }
        );
    }
  }, [authState]);

  const autoLogout = () => {
    let objauth = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)
      ? JSON.parse(atob(localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)))
      : null;
    if (objauth) {
      let time = Math.floor(new Date().getTime() / 1000);
      if (objauth.expirationTime <= time) {
        if (window.location.pathname !== "/")
          alert("Phiên đăng nhập đã hết hạn vui lòng đăng nhập lại.");
        LogOut();
      }
    }
  };

  useEffect(() => {
    autoLogout();
  });

  useEffect(() => {
    /*  const autoLogout = () => {
      if (document.visibilityState === "hidden") {
        const timeOutId = window.setTimeout(logoutUser, 5 * 60 * 1000);
        logoutTimerIdRef.current = timeOutId;
      } else {
        window.clearTimeout(logoutTimerIdRef.current);
      }
    };*/

    document.addEventListener("click", autoLogout);

    return () => {
      document.removeEventListener("click", autoLogout);
    };
  }, []);

  const Login = ({ user, pass }) => {
    if (user === info.user && pass === info.pass) {
      const currentDateTime = new Date();
      const updateDateTime = new Date();
      const expireDateTime = new Date(
        updateDateTime.setHours(updateDateTime.getHours() + 2)
      );
      const currentTimestamp = Math.floor(currentDateTime.getTime() / 1000);
      const expireTimeStamp = Math.floor(expireDateTime.getTime() / 1000);

      const initialState = {
        isLogin: true,
        loginTime: currentTimestamp,
        expirationTime: expireTimeStamp,
        token: fixed_token,
      };
      localStorage.setItem(
        LOCAL_STORAGE_TOKEN_NAME,
        btoa(JSON.stringify(initialState))
      );

      loadUser();
    } else {
      alert("Sai thông tin đăng nhập");
    }
  };

  const LogOut = () => {
    dispatch({
      type: "SET_AUTH",
      payload: { isAuthenticated: false, user: null },
    });
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
  };

  // Context data
  const authenContextData = {
    authState,
    Login,
    LogOut,
    fixed_token,
    LOCAL_STORAGE_TOKEN_NAME,
  };

  // Return provider
  return (
    <AuthenContext.Provider value={authenContextData}>
      {children}
    </AuthenContext.Provider>
  );
};

export default AuthenContextProvider;
