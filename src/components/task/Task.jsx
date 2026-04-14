import React from 'react';
import { Link } from 'react-router-dom';
import style from './task.module.css'

const Task = ({ children, id }) => {

  const handleDragStart = (event) => {
    try {
      event.dataTransfer.setData('text/plain', String(id));
      event.dataTransfer.effectAllowed = 'move';
    } catch (e) {
      // no-op
    }
  };

  const handleDragEnd = () => {
    // no-op
  };

  const handleTouchStart = (e) => {
    // помечаем, что идёт touch-драг, чтобы подавить переход по ссылке
    window.__touchDragging = true;
  };

  const handleTouchEnd = (e) => {
    const t = e.changedTouches && e.changedTouches[0];
    if (t) {
      const detail = { taskId: id, clientX: t.clientX, clientY: t.clientY };
      const ev = new CustomEvent('mobile-drop', { detail });
      document.dispatchEvent(ev);
    }
    // снять флаг после кадра, чтобы onClick не сработал
    setTimeout(() => { window.__touchDragging = false; }, 0);
    e.preventDefault();
    e.stopPropagation();
  };

  const handleClick = (e) => {
    if (window.__touchDragging) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <Link
      to={`task/${id}`}
      className={style.link}
      draggable
      data-task="true"
      data-id={id}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
    >
      {children}
    </Link >
  );
}

export default Task;
