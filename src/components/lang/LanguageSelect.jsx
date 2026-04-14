import React from 'react';
import { useNavigate } from 'react-router-dom';
import { I18nContext } from '../../i18n';
import style from '../login/login.module.css';

const LanguageSelect = () => {
  const navigate = useNavigate();
  const { setLang } = React.useContext(I18nContext);

  const choose = (l) => {
    setLang(l);
    navigate('/login');
  };

  return (
    <div className={style.login}>
      <div className={style.form} style={{ alignItems: 'center' }}>
        <h1>Choose language / Выберите язык</h1>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className={style.button} onClick={() => choose('en')}>English</button>
          <button className={style.button} onClick={() => choose('ru')}>Русский</button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelect;
