import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context';
import Button from '../UI/button/Button';
import style from './login.module.css';
import { useNavigate } from 'react-router-dom';
import { useT } from '../../i18n';

const Login = () => {
  const { setIsAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const t = useT();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const signIn = e => {
    e.preventDefault();
    const saved = localStorage.getItem('user');
    if (!saved) {
      setError(t('needRegisterFirst'));
      return;
    }
    try {
      const user = JSON.parse(saved);
      if (user.login === login && user.password === password) {
        setIsAuth(true);
        localStorage.setItem('auth', 'true');
        localStorage.setItem('currentUser', user.login);
        navigate('/');
      } else {
        setError(t('invalidCredentials'));
      }
    } catch {
      setError(t('userDataCorrupted'));
    }
  }

  return (
    <div className={style.login}>
      <form className={style.form} onSubmit={signIn}>
        <h1>{t('loginTitle')}</h1>
        <label>
          {t('loginLabel')}
          <input type='text' placeholder={t('loginPlaceholder')} className={style.input} value={login} onChange={(e) => setLogin(e.target.value)} autoComplete="off" />
        </label>
        <label>
          {t('passwordLabel')}
          <input type='password' placeholder={t('passwordPlaceholder')} className={style.input} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="off" />
        </label>
        {error && <div style={{ color: '#d33', fontSize: 14, textAlign: 'center' }}>{error}</div>}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Button className={style.button}>{t('signIn')}</Button>
          <Button className={style.button} onClick={(e) => { e.preventDefault(); navigate('/register'); }}>{t('register')}</Button>
        </div>
      </form>
    </div>
  );
}

export default Login;
