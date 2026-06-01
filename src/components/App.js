// App.js
import React, { useContext, useState } from 'react';
import './../styles/App.css';
const AuthContext = React.createContext();

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authenticate = (status) => {
    setIsAuthenticated(status);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, authenticate }}>
      {children}
    </AuthContext.Provider>
  );
};

const Auth = () => {
  const { isAuthenticated, authenticate } = useAuth();

  const handleCheckboxChange = (e) => {
    authenticate(e.target.checked);
  };

  return (
    <div>
      <h2>Click on the checkbox to get authenticated</h2>

      <p>
        {!isAuthenticated ? (
          <span className="not-authenticated">you are not authenticated</span>
        ) : (
          <span className="authenticated">You are now authenticated, you can proceed!</span>
        )}
      </p>
      <label>
        <input
          type="checkbox"
          checked={isAuthenticated}
          onChange={handleCheckboxChange}
        />
        I'm not a robot
      </label>
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <Auth />
      </AuthProvider>
    </div>
  );
};

export default App;