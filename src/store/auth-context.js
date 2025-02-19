import React from 'react';

// creating and exporting the context 
const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {}
});

export default AuthContext;