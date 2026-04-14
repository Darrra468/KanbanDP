import React, { useEffect, useState } from 'react';
import style from './account.module.css';
import avatar from '../header/avatar.svg';
import { I18nContext } from '../../i18n';

const Account = () => {
  const { t } = React.useContext(I18nContext);
  const [user, setUser] = useState({
    login: '-',
    firstName: '-',
    lastName: '-',
    email: '-',
    color: '-',
  });

  useEffect(() => {
    try {
      const raw = localStorage.getItem('user');
      if (raw) {
        const parsed = JSON.parse(raw);
        setUser({
          login: parsed.login || '-',
          firstName: parsed.firstName || '-',
          lastName: parsed.lastName || '-',
          email: parsed.email || '-',
          color: parsed.color || '-',
        });
      }
    } catch { /* ignore */ }
  }, []);
  return (
    <div className={style.account}>
      <div className={style.container}>
        <div className={style.wrapper}>
          <img src={avatar} alt="аватар" className={style.avatar} />
          <h2 className={style.title}>{t('myProfile')}</h2>
          <span className={style.subText}>{t('login')}</span>
          <span className={style.text}>{user.login}</span>
          <span className={style.subText}>{t('firstName')}</span>
          <span className={style.text}>{user.firstName}</span>
          <span className={style.subText}>{t('lastName')}</span>
          <span className={style.text}>{user.lastName}</span>
          <span className={style.subText}>{t('email')}</span>
          <span className={style.text}>{user.email}</span>
          <span className={style.subText}>{t('favColor')}</span>
          <span className={style.text}>{user.color}</span>
        </div>
      </div>
    </div>
  );
}

export default Account;
