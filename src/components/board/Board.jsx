import React, { useContext, useEffect } from 'react';
import Add from '../add/Add';
import Task from '../task/Task';
import style from './board.module.css';
import { I18nContext, translations } from '../../i18n';

const Board = ({ state, ...props }) => {
  const { lang, t } = useContext(I18nContext);
  const titles = (translations[lang] && translations[lang].columns) || translations.ru.columns;

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = (e) => {
    e.currentTarget.classList.add(style.hover);
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove(style.hover);
  };

  const handleDrop = (e, targetTitle) => {
    e.preventDefault();
    const container = e.currentTarget;
    // Определяем индекс вставки по позиции курсора относительно карточек
    const taskNodes = Array.from(container.querySelectorAll('[data-task="true"]'));
    const y = e.clientY;
    let insertIndex = taskNodes.length; // по умолчанию в конец
    for (let i = 0; i < taskNodes.length; i++) {
      const rect = taskNodes[i].getBoundingClientRect();
      const middleY = rect.top + rect.height / 2;
      if (y < middleY) { insertIndex = i; break; }
    }

    const idStr = e.dataTransfer.getData('text/plain');
    if (!idStr) return;
    const taskId = Number(idStr);

    props.setState(prev => {
      // Найти исходную колонку и задачу
      let sourceIndex = -1;
      let sourcePos = -1;
      let taskObj = null;
      prev.forEach((col, idx) => {
        if (taskObj) return;
        const pos = col.tasks.findIndex(t => t.id === taskId);
        if (pos !== -1) {
          sourceIndex = idx;
          sourcePos = pos;
          taskObj = col.tasks[pos];
        }
      });

      if (!taskObj) return prev;

      // Если перетаскиваем в ту же колонку — переставляем позицию
      const targetIndex = prev.findIndex(c => c.title === targetTitle);
      if (targetIndex === -1) return prev;

      // Создать новые структуры без мутаций
      const next = prev.map(col => ({ ...col, tasks: [...col.tasks] }));
      // Удалить из источника и получить объект
      next[sourceIndex].tasks.splice(sourcePos, 1);

      // Корректировка insertIndex при переносе в ту же колонку
      if (targetIndex === sourceIndex && insertIndex > sourcePos) {
        insertIndex = insertIndex - 1;
      }

      // Ограничить индекс диапазоном
      const targetLen = next[targetIndex].tasks.length;
      const safeIndex = Math.max(0, Math.min(insertIndex, targetLen));
      next[targetIndex].tasks.splice(safeIndex, 0, taskObj);

      // Удаляем подсветку
      try { e.currentTarget.classList.remove(style.hover); } catch (_) { }
      return next;
    });
  };

  // Mobile touch DnD: listen to custom events dispatched from Task on touchend
  useEffect(() => {
    const onMobileDrop = (ev) => {
      try {
        const { taskId, clientX, clientY } = ev.detail || {};
        if (typeof taskId !== 'number' && typeof taskId !== 'string') return;
        const el = document.elementFromPoint(clientX, clientY);
        const container = el && el.closest && el.closest('.' + style.board);
        if (!container) return;
        const targetTitle = container.getAttribute('data-title');
        if (!targetTitle) return;

        // compute insert index
        const taskNodes = Array.from(container.querySelectorAll('[data-task="true"]'));
        let insertIndex = taskNodes.length;
        for (let i = 0; i < taskNodes.length; i++) {
          const rect = taskNodes[i].getBoundingClientRect();
          const middleY = rect.top + rect.height / 2;
          if (clientY < middleY) { insertIndex = i; break; }
        }

        const idNum = Number(taskId);
        if (!idNum) return;

        // Move task using same logic as desktop drop
        props.setState(prev => {
          let sourceIndex = -1;
          let sourcePos = -1;
          let taskObj = null;
          prev.forEach((col, idx) => {
            if (taskObj) return;
            const pos = col.tasks.findIndex(t => t.id === idNum);
            if (pos !== -1) { sourceIndex = idx; sourcePos = pos; taskObj = col.tasks[pos]; }
          });
          if (!taskObj) return prev;
          const targetIndex = prev.findIndex(c => c.title === targetTitle);
          if (targetIndex === -1) return prev;
          const next = prev.map(col => ({ ...col, tasks: [...col.tasks] }));
          next[sourceIndex].tasks.splice(sourcePos, 1);
          if (targetIndex === sourceIndex && insertIndex > sourcePos) insertIndex = insertIndex - 1;
          const targetLen = next[targetIndex].tasks.length;
          const safeIndex = Math.max(0, Math.min(insertIndex, targetLen));
          next[targetIndex].tasks.splice(safeIndex, 0, taskObj);
          return next;
        });
      } catch (_) { /* noop */ }
    };
    document.addEventListener('mobile-drop', onMobileDrop);
    return () => document.removeEventListener('mobile-drop', onMobileDrop);
  }, [props]);
  return (
    <>
      {state.map(item =>
        <div
          key={item.title}
          className={style.board}
          data-title={item.title}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, item.title)}
        >
          <h2> {titles[item.title] || item.title} </h2>
          {item.tasks.length
            ? item.tasks.map(item =>
              <Task key={item.id} id={item.id} data-task="true">
                {item.task}
              </Task>
            )
            : <div className={style.missing}>{t('tasksEmpty')}</div>
          }
          <Add
            alt='+ добавить карточку'
            title={item.title}
            tasks={item.tasks}
            state={state}
            setState={props.setState}
          > {t('addCard')} </Add>
        </div>
      )}
    </>
  );
}

export default Board;
