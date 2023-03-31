import React, { useState, useContext, createContext, useMemo } from 'react';
import { Navigate } from 'react-router-dom';

const AuthContext = createContext(null);

// A customized context provider that abstracts away the logics for handling signin and signout (best practice for createContext/useContext hooks)
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Signin event handler to be passed to children component with the signin button
  const signin = async (username, password) => {
    const res = await fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-type': 'application/json',
      },
    });
    // Returned signedInUser from backend would be the 200 with payload{username:...} or 401 with payload {error:...} if the signin failed
    const signedInUser = await res.json();
    if (!res.ok) {
      setUser(null);
    } else {
      setUser(signedInUser.username);
    }
    return signedInUser.username;
  };

  // Signout event handler to be passed to children component with the signout button
  const signout = async () => {
    await fetch('auth/logout', {
      method: 'DELETE',
    });
    setUser(null);
  };

  // Optimize the React re-rendering to avoid new value object and re-rendering every time.
  const value = useMemo(
    () => ({ user, signin, signout }),
    [user, signin, signout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Customized useContext to provide more descriptive name.
export function useAuth() {
  return useContext(AuthContext);
}

// Parent component for all the protected components/routes
export function RequireAuth({ children }) {
  const auth = useAuth();

  /*
  navigate needs to be put in useEffect
  useEffect(() => {
    if (!auth.user) {
      navigate('/');
    }
  }, [auth]);
  */

  /* 
  * <Navigate/> component is better than put navigate() in useEffect hook, as useEffect will happen after running the protected children component (including fetch request), and only before mounting.

  <Navigate/> will ensure redirect happen right away.
  */
  // if (!auth.user) {
  //   return <Navigate to="/" />;
  // }

  return children;
}
