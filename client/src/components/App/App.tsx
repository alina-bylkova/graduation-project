import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from '../Home/Home';
import Chat from '../Chat/Chat';
import PatientLogin from '../PatientLogin/PatientLogin';
import PatientSignUp from '../PatientSignUp/PatientSignUp';
import PsychologistLogin from '../PsychologistLogin/PsychologistLogin';
import Navbar from '../Navbar/Navbar';
import Dashboard from '../Dashboard/Dashboard';
import ChatPsychologist from '../Chat/ChatPsychologist';

const App = () => {
  const initToken = () => {
    const localToken = window.localStorage.getItem('token');
    if (localToken) {
      return localToken;
    } else {
      return '';
    }
  };

  const [token, setToken] = useState(initToken);
  const [currentCase, setCurrentCase] = useState();

  const saveToken = (token: string) => {
    window.localStorage.setItem('token', token);
    setToken(token);
  };

  useEffect(() => {
    if (token === '') {
      const localToken = window.localStorage.getItem('token');
      if (localToken) {
        setToken(localToken);
      }
    }
  });

  return (
    <BrowserRouter>
      <Navbar token={token} saveToken={saveToken} />
      <Switch>
        <Route exact path="/login/patient">
          <PatientLogin saveToken={saveToken} token={token} />
        </Route>
        <Route exact path="/signup/patient">
          <PatientSignUp saveToken={saveToken} token={token} />
        </Route>
        <Route exact path="/login/psychologist">
          <PsychologistLogin saveToken={saveToken} />
        </Route>
        <Route exact path="/chat">
          <Chat token={token} saveToken={saveToken} />
        </Route>
        <Route exact path="/chat/psychologist">
          <ChatPsychologist token={token} saveToken={saveToken} currentCase={currentCase} setCurrentCase={setCurrentCase} />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard token={token} saveToken={saveToken} setCurrentCase={setCurrentCase} />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
