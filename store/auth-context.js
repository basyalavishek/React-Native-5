import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  token: "",
  isauthenticated: false,
  authenticate: () => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();

  function authenticate(token) {
    setAuthToken(token);
    AsyncStorage.setItem("token", token);
    // Save the value of token in local storage (like a small database on your phone), with the name 'token' so I can use it later.
    // Why it’s used:->So your app can remember the user’s login info (token) even after the app is closed.
    // Next time the app opens, you can read the token back using AsyncStorage.getItem('token') and keep the user logged in without asking them to log in again.
    // the second parameter should always be the string
  }

  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem("token"); // when log out the welcome screen is not shown as token is removed from "AsyncStorage"
  }

  const value = {
    token: authToken,
    isauthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
