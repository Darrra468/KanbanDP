import React, { useState } from 'react';
import Button from '../button/Button';
import style from './input.module.css';
import { useT } from '../../../i18n';

const Input = ({ state, setState, setBtnCondition }) => {
  const t = useT();
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');

  const addTask = () => {
    if (task.length > 0) {
      const newTask = state.map(num => {
        if (num.title === 'Backlog') {
          num.tasks.push({
            id: Date.now(),
            task: task,
            description: description,
            date: new Date().toDateString().slice(3),
          })
        }
        return num;
      })
      setState([...newTask]);
      setBtnCondition(false)
    }
  }


  return (
    <>
      <input type="text" placeholder={t('taskTitlePlaceholder')} className={style.input} onChange={e => setTask(e.target.value)} onKeyPress={e => e.key === 'Enter' ? addTask() : ''} />
      <textarea rows="5" placeholder={t('descriptionPlaceholder')} className={style.textarea} onChange={e => setDescription(e.target.value)} />
      <Button className={style.button} onClick={addTask}>{t('add')}</Button>
    </>
  );
}

export default Input;
