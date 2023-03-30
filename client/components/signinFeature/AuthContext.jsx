import React, {
  useState,
  useContext,
  createContext,
  useMemo,
  useEffect,
} from 'react';
import { Navigate } from 'react-router-dom';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const signin = async (username, password) => {
    const res = await fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const signedInUser = await res.json();
    setUser(signedInUser);
    return signedInUser;
  };

  const signout = () => {
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, signin, signout }),
    [user, signin, signout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function RequireAuth({ children }) {
  const auth = useAuth();

  // navigate needs to be put in useEffect
  // useEffect(() => {
  //   if (!auth.user) {
  //     navigate('/');
  //   }
  // }, [auth]);

  /* 
  * <Navigate/> component is better than put navigate() in useEffect hook, as useEffect will happen after running the protected children component (including fetch request), and only before mounting.

  <Navigate/> will ensure redirect happen right away.
  */

  if (!auth.user) {
    return <Navigate to="/" />;
  }

  return children;
}
