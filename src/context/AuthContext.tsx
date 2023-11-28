import React, { useState, useEffect, useContext, ReactNode } from "react";
import { UserAuthType } from "../types/userAuth.types";
import { auth } from "../utils/firebase/firebase.config";
// React.Dispatch: This is a utility type provided by React. It represents a function that dispatches an action. In the context of state management with hooks like useState, it refers to the function you use to update the state.
// <React.SetStateAction<UserAuthType | null>>: This is a generic type that Dispatch is using. SetStateAction is a type that can either be a new value for the state or a function that receives the previous state and returns the new state. This flexibility is useful for complex state updates.
// UserAuthType | null: This indicates that the state can be of type UserAuthType or null. It's a union type, meaning the state can hold a UserAuthType object or be null if there's no user data.
type AuthContextType = {
  authUser: UserAuthType | null;
  setAuthUser: React.Dispatch<React.SetStateAction<UserAuthType | null>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
};

const defaultAuthContext: AuthContextType = {
  authUser: null,
  setAuthUser: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  isLoading: true,
};
const AuthContext = React.createContext(defaultAuthContext);

type AuthProviderProps = {
  children: ReactNode;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authUser, setAuthUser] = useState<null | UserAuthType>(
    defaultAuthContext.authUser
  );
  const [isLoggedIn, setIsLoggedIn] = useState(defaultAuthContext.isLoggedIn);
  const [isLoading, setIsLoading] = useState(defaultAuthContext.isLoading);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoading(false);

      if (user) {
        setAuthUser(user);
        setIsLoggedIn(true);
      } else {
        setAuthUser(null);
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const value = {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
