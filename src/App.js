import Login from './containers/Login/Login.js';
import Main from './containers/Main/Main.js'
import React, {useState, useEffect}  from 'react';
import { useOutletContext, BrowserRouter as Router  } from "react-router-dom";
import './App.css';
import { updateUserLastLogin } from './api/UserAPI.js';

//import ReactDOM from 'react-dom/client';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn');

    if (loginStatus === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (userId) => {

    localStorage.setItem('isLoggedIn', '1');
    localStorage.setItem('userId', userId);
    setIsLoggedIn(true);
    
    console.log(updateUserLastLogin(userId).message);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    localStorage.removeItem('courseId');
    setIsLoggedIn(false);
  };

  return (

      <div className='App'>
        <Router>
          <main>
            {isLoggedIn ? <Main onLogout={logoutHandler}/> : <Login onLogin={loginHandler}/>}
          </main>
        </Router>
      </div>
  );
}

export default App;
