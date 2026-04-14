import React from 'react';
import style from './nopage.module.css';
import { I18nContext } from '../../i18n';

const NoPage = () => {
  const { t } = React.useContext(I18nContext);
  return (
    <div className={style.noPage}>
      <div className={style.container}>
        <h1 className={style.title}>{t('noPage')}</h1>
      </div>
    </div>
  );
}

export default NoPage;
