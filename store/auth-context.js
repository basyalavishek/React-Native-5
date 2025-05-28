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

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");

      if (storedToken) {
        setAuthToken(storedToken);
      }
    }
    fetchToken();
  }, []); //   // This function runs only one time when the app starts (because of the empty [])

  /*
What it does:
 It checks AsyncStorage (your device's local storage) for a saved token under the key "token".
 If it finds a token, it calls setAuthToken(storedToken) to:Set the token back into state This triggers isAuthenticated to become true
 This keeps the user logged in across app restarts!

💡 Why is it important?
Without this useEffect, when the app restarts:The token stored in local storage is not read.Your app will think the user is logged out, even though their token is still stored.
  */

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
