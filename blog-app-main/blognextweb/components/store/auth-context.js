import React, { useState } from "react";

const AuthContext = React.createContext({
  userName: "",
  authorities: "",
  token: "",
  isLoggedIn: false,
  login: (loginResponse) => {},
  logout: () => {},
  ROLES: {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(typeof window !== 'undefined'? sessionStorage.getItem("token"): '');
  const [userName, setUserName] = useState(typeof window !== 'undefined'? sessionStorage.getItem("userName"): '');
  const [authorities, setAuthorities] = useState(  
    typeof window !== 'undefined'? sessionStorage.getItem("authorities"): null
  );

  const userIsLoggedIn = !!token;

  const loginHandler = ({ username, authorities, jwt }) => {
    setUserName(username);
    setAuthorities(authorities);
    setToken(jwt);
    if(typeof window !== 'undefined') {
      sessionStorage.setItem("userName", username);
      sessionStorage.setItem("authorities", authorities);
      sessionStorage.setItem("token", jwt);
    }
  };

  const logoutHandler = () => {
    setUserName(null);
    setAuthorities(null);
    setToken(null);
    if(typeof window !== 'undefined') {
      sessionStorage.removeItem("userName");
      sessionStorage.removeItem("authorities");
      sessionStorage.removeItem("token");
    }
  };

  const contextValue = {
    userName: userName,
    authorities: authorities,
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    ROLES: {
      admin: "ROLE_ADMIN",
      user: "ROLE_USER",
    },
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
