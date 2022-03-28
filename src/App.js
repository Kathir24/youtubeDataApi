import React, { useEffect, useState } from 'react';
import './App.css';
import './style.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import SearchPage from './SearchPage';
import { connect } from 'react-redux'

function App({ totalState, dispatchFun }) {
  const [token, setToken] = useState('');
  const [condition, setCondition] = useState(true);
  const [userName, setUserName] = useState('');

  const auth = (data) => {
    setCondition(data);
  }
  useEffect(() => {
    console.log(condition);
  }, [condition])
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* {condition ? */}
          <Route path='/' element={<LoginPage
            setToken={setToken}
            auth={auth}
            setUserName={setUserName}
          />} /> :

          <Route path='/details' element={<SearchPage
            token={token}
            auth={auth}
            userName={userName}
            totalState={totalState}
            dispatchFun={dispatchFun}
          />} />

          {/* } */}
          <Route path='*' element={<Navigate to={condition ? '/' : '/details'} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

// AIzaSyBYYTAARGLaXTTBVTM88fCHTTffPZrzr-g

// const clientId = 378362567749-ldtnta9svi4g4ct9rm8dgjint0n6e6un.apps.googleusercontent.com
// client serect =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
