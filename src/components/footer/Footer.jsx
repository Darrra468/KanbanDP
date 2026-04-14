import React from 'react';
import style from './footer.module.css';
import { I18nContext } from '../../i18n';


const Footer = () => {
  const { t } = React.useContext(I18nContext);

  let active = 0;
  let finished = 0;
  try {
    const user = localStorage.getItem('currentUser') || '';
    const key = user ? `state_${user}` : 'state';
    const saved = localStorage.getItem(key);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        const byTitle = Object.fromEntries(parsed.map(c => [c.title, c.tasks || []]));
        active = (byTitle['Backlog']?.length || 0) + (byTitle['In Progress']?.length || 0) + (byTitle['Ready']?.length || 0);
        finished = byTitle['Finished']?.length || 0;
      }
    }
  } catch (_) { /* noop */ }

  return (
    <footer className={style.footer}>
      <div className={style.container}>
        <div className={style.block}>
          <span className={style.text}>{t('activeTasks')}: {active}</span>
          <span className={style.text}>{t('finishedTasks')}: {finished}</span>
        </div>
        <div>
          <span className={style.text}>Kanban board by Dasha Petrenko, 2026</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
