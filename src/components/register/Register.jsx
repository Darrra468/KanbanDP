import React, { useState } from 'react';
import Button from '../UI/button/Button';
import style from '../login/login.module.css';
import { useNavigate } from 'react-router-dom';
import { useT } from '../../i18n';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Register = () => {
  const navigate = useNavigate();
  const t = useT();
  const [login, setLogin] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [color, setColor] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [agree, setAgree] = useState(false);

  const onRegister = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!login || !firstName || !lastName || !email || !password || !confirm) {
      setError(t('mustFillAll'));
      return;
    }
    if (!agree) {
      setError(t('mustAgree'));
      return;
    }
    if (!emailRegex.test(email)) {
      setError(t('invalidEmail'));
      return;
    }
    if (password.length < 6) {
      setError(t('passwordTooShort'));
      return;
    }
    if (password !== confirm) {
      setError(t('passwordsMismatch'));
      return;
    }
    const user = { login, firstName, lastName, email, color, password };
    localStorage.setItem('user', JSON.stringify(user));
    setMessage(t('registerSuccess'));
    setTimeout(() => navigate('/login'), 700);
  };

  return (
    <div className={style.login}>
      <form className={style.form} onSubmit={onRegister}>
        <h1>{t('registerTitle')}</h1>
        <label>
          {t('loginLabel')}
          <input type='text' placeholder={t('loginPlaceholder')} className={style.input} value={login} onChange={(e) => setLogin(e.target.value)} />
        </label>
        <label>
          {t('firstName')}
          <input type='text' placeholder='' className={style.input} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </label>
        <label>
          {t('lastName')}
          <input type='text' placeholder='' className={style.input} value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </label>
        <label>
          {t('email')}
          <input type='email' placeholder='' className={style.input} value={email} onChange={(e) => setEmail(e.target.value)} autoComplete='off' />
        </label>
        <label>
          {t('favColor')}
          <input type='text' placeholder='' className={style.input} value={color} onChange={(e) => setColor(e.target.value)} />
        </label>
        <label>
          {t('password')}
          <input type='password' placeholder='' className={style.input} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete='new-password' />
        </label>
        <label>
          {t('repeatPassword')}
          <input type='password' placeholder='' className={style.input} value={confirm} onChange={(e) => setConfirm(e.target.value)} autoComplete='new-password' />
        </label>
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontWeight: 400 }}>
          <input type='checkbox' checked={agree} onChange={(e) => setAgree(e.target.checked)} />
          <span>
            {t('agree')} 
            <a href='https://www.consultant.ru/document/cons_doc_LAW_61801/' target='_blank' rel='noreferrer'>{t('law152')}</a>.
          </span>
        </label>
        {error && <div style={{ color: '#d33', fontSize: 14, textAlign: 'center' }}>{error}</div>}
        {message && <div style={{ color: '#0b5', fontSize: 14, textAlign: 'center' }}>{message}</div>}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Button className={style.button}>{t('register')}</Button>
        </div>
      </form>
    </div>
  );
};

export default Register;
