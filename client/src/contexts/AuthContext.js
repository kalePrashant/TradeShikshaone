import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // This will be replaced with actual authentication logic later
  useEffect(() => {
    // Simulate checking if user is logged in
    const checkAuth = () => {
      // For now, just set to null (not logged in)
      setCurrentUser(null);
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  // Function to handle user logout
  const logout = () => {
    console.log('User logged out');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}