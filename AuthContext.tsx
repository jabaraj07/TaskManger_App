import React, {createContext, useContext, useEffect, useState, useCallback} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {Platform} from "react-native";

type User = {
  id: number;
  name: string;
};

type AuthState = {
  isLoading: boolean;
  isSignedIn: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  user: User | null;
};

const AuthContext = createContext<AuthState>(undefined as never);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const SearchLink =
    Platform.OS === "web" ? "http://localhost:8080/user/login" : "http://10.0.2.2:8080/user/login";

  const [isLoading, setLoading] = useState(true);
  const [isSignedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // useEffect(() => {
  //   console.log("From Auth Context (user):", user);
  // }, [user]);

  useEffect(() => {
    (async () => {
      const flag = await AsyncStorage.getItem("isLoggedIn");
      const storedUser = await AsyncStorage.getItem("user");

      if (flag === "true" && storedUser) {
        setSignedIn(true);
        setUser(JSON.parse(storedUser));
      }

      setLoading(false);
    })();
  }, []);

  const signIn = useCallback(
    async (email: string, password: string) => {
      try {
        const {data} = await axios.post(SearchLink, {email, password});
        await AsyncStorage.setItem("isLoggedIn", "true");
        await AsyncStorage.setItem("user", JSON.stringify(data));

        setUser(data);
        setSignedIn(true);
        return true;
      } catch (err) {
        return false;
      }
    },
    [setUser, setSignedIn],
  ); // ← include these in deps

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem("isLoggedIn");
    await AsyncStorage.removeItem("user");
    setSignedIn(false);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{isLoading, isSignedIn, signIn, signOut, user}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
