import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import Account from './components/account/Account';
import InsideTask from './components/insideTask/InsideTask';
import Login from './components/login/Login';
import Register from './components/register/Register';
import './App.css';
import { AuthContext } from "./context";
import Loader from "./components/UI/loader/Loader";
import { I18nContext, translations } from './i18n';
import LanguageSelect from './components/lang/LanguageSelect';
// DarkVeil закомментирован
// import DarkVeil from './components/background/DarkVeil';

function App() {
  const [state, setState] = useState([
    {
      title: 'Backlog',
      tasks: [],
    },
    {
      title: 'Ready', tasks: [],
    },
    {
      title: 'In Progress', tasks: [],
    },
    {
      title: 'Finished', tasks: [],
    }
  ]);

  // Auth and i18n states should be declared before effects that depend on them
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [lang, setLang] = useState('ru');
  const t = (key) => {
    const dict = translations[lang] || translations.ru;
    const parts = key.split('.');
    return parts.reduce((acc, k) => (acc && acc[k] !== undefined ? acc[k] : undefined), dict) ?? key;
  };

  // Load per-user state on auth changes and initial mount
  useEffect(() => {
    try {
      const currentUser = localStorage.getItem('currentUser') || '';
      const key = currentUser ? `state_${currentUser}` : 'state';
      const tasks = localStorage.getItem(key);
      if (tasks) {
        const parsed = JSON.parse(tasks);
        if (Array.isArray(parsed)) {
          setState(parsed);
          return;
        }
      }
      // fallback to empty board if nothing found
      setState([
        { title: 'Backlog', tasks: [] },
        { title: 'Ready', tasks: [] },
        { title: 'In Progress', tasks: [] },
        { title: 'Finished', tasks: [] },
      ]);
    } catch (e) {
      const currentUser = localStorage.getItem('currentUser') || '';
      const key = currentUser ? `state_${currentUser}` : 'state';
      localStorage.removeItem(key);
    }
  }, [isAuth])

  // Save per-user state on every state change
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser') || '';
    const key = currentUser ? `state_${currentUser}` : 'state';
    window.localStorage.setItem(key, JSON.stringify(state))
  }, [state]);

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setIsAuth(true);
    }
    const savedLang = localStorage.getItem('lang');
    if (savedLang) setLang(savedLang);
    setLoading(false);
  }, [])

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="app">
      {/* Убираем DarkVeil */}
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        <AuthContext.Provider value={{
          isAuth,
          setIsAuth,
        }}>
          <I18nContext.Provider value={{ lang, setLang: (l)=>{ localStorage.setItem('lang', l); setLang(l); }, t }}>
            <Router>
              <Routes>
                {isAuth
                  ? <Route path='/' element={<Header />}>
                    <Route index element={<Account />} />
                    <Route path='tasks' element={<Main state={state} setState={setState} />} />
                    <Route path='tasks/task/:id' element={<InsideTask state={state} setState={setState} />} />
                    <Route path='*' element={<Navigate to='/' replace />} />
                  </Route>
                  : <>
                      <Route path="/" element={<LanguageSelect />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path='*' element={<Navigate to='/' replace />} />
                    </>
                }
              </Routes>
            </Router>
          </I18nContext.Provider>
        </AuthContext.Provider>
      </div>
    </div>
  );
}

export default App;