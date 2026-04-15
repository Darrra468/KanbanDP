import React, { useContext, useState, useEffect } from 'react';
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

  // Добавляем предзаполнение при загрузке компонента
  useEffect(() => {
    // Проверяем, есть ли уже пользователь в localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        // Предзаполняем поля логином из сохраненного пользователя
        if (user.login) {
          setLogin(user.login);
        } else if (user.email) {
          setLogin(user.email);
        }
        // Можно предзаполнить пароль, но лучше оставить пустым для безопасности
        // setPassword('123456'); // если хотите предзаполнить
      } catch(e) {}
    } else {
      // Если нет пользователя, ставим тестовые данные для демонстрации
      setLogin('test@test.com');
      setPassword('123456');
    }
  }, []);

  const signIn = e => {
    e.preventDefault();
    
    const saved = localStorage.getItem('user');
    console.log('Сохраненный пользователь:', saved); // Для отладки
    
    if (!saved) {
      setError(t('needRegisterFirst') + ' Сначала зарегистрируйтесь');
      return;
    }
    
    try {
      const user = JSON.parse(saved);
      console.log('Введено:', login, password);
      console.log('Из хранилища:', user.login, user.password);
      
      // Сравниваем логин и пароль
      if (user.login === login && user.password === password) {
        setIsAuth(true);
        localStorage.setItem('auth', 'true');
        localStorage.setItem('currentUser', user.login);
        navigate('/');
      } else {
        setError('Неверный логин или пароль. Попробуйте: ' + (user.login || 'test@test.com') + ' / ' + (user.password || '123456'));
      }
    } catch (err) {
      console.error('Ошибка входа:', err);
      setError(t('userDataCorrupted'));
    }
  }

  return (
    <div className={style.login}>
      <form className={style.form} onSubmit={signIn}>
        <h1>{t('loginTitle')}</h1>
        <label>
          {t('loginLabel')}
          <input 
            type='text' 
            placeholder={t('loginPlaceholder')} 
            className={style.input} 
            value={login} 
            onChange={(e) => setLogin(e.target.value)} 
            autoComplete="off"
          />
        </label>
        <label>
          {t('passwordLabel')}
          <input 
            type='password' 
            placeholder={t('passwordPlaceholder')} 
            className={style.input} 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            autoComplete="off"
          />
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