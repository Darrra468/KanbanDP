import React, { useState, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import style from './header.module.css';
import avatar from './avatar.svg';
import arrow from './arrow.svg';
import Footer from '../footer/Footer';
import { AuthContext } from '../../context';
import { I18nContext } from '../../i18n';


const Header = () => {
  const [visible, setVisible] = useState(false);
  const { setIsAuth } = useContext(AuthContext);
  const { t } = useContext(I18nContext);

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem('auth');
    localStorage.removeItem('currentUser');
  }

  return (
    <header className={style.header}>
      <div className={style.container}>
        <h1 className={style.title}>{t('kanbanBoard')}</h1>
        <div className={style.profile}>
          <img src={avatar} alt="аватар" />

          <button
            className={style.button}
            onClick={() => setVisible(!visible)}
          >
            <img src={arrow} alt="стрелка" className={visible ? style.arrow : ' '} />
            <div className={visible ? style.menu : style.noMenu}>

              <Link to=''>{t('menu.profile')}</Link>
              <Link to='/tasks'>{t('menu.tasks')}</Link>
              <Link to='/' onClick={logout}>{t('menu.logout')}</Link>

            </div>
          </button>
        </div>
      </div >
      <Outlet />

      <Footer />
    </header >
  );
}

export default Header;

