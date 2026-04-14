import React from 'react';
import style from './dropDown.module.css';
import { useT } from '../../../i18n';

const Dropdown = ({ state, setState, title, setBtnCondition }) => {
  const t = useT();
  let selectTasks;
  if (title === 'Ready') {
    selectTasks = state.find(num => num.title === 'Backlog')
  } else if (title === 'In Progress') {
    selectTasks = state.find(num => num.title === 'Ready')
  } else if (title === 'Finished') {
    selectTasks = state.find(num => num.title === 'In Progress')
  }

  const movingTasks = e => {
    const newTasks = state.map(board => {
      let taskId = +e.target.value;
      let newTask = selectTasks.tasks.find(obj => obj.id === taskId)
      //удаление из предыдущего task
      if (board.title === selectTasks.title) {
        return { ...board, tasks: selectTasks.tasks.filter(task => task.id !== taskId) }
      }
      //добавление в новый task
      if (board.title === title) {
        return { ...board, tasks: [...board.tasks, newTask] }
      }
      return board;
    })
    setState(newTasks);
    setBtnCondition(false);
  }

  return (
    <select
      name='select'
      className={style.select}
      onChange={movingTasks}
    >
      <option value=''>
        {t('selectTask')}
      </option>
      {selectTasks.tasks.map(item => {
        return (
          <option
            className={style.option}
            value={item.id}
            key={item.id}
          >
            {item.task}
          </option>)
      })}
    </select >
  );
}

export default Dropdown;
