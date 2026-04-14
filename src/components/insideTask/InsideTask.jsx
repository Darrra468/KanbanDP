import React from 'react';
import Button from '../UI/button/Button';
import style from './insideTask.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import back from './x.svg';
import { I18nContext } from '../../i18n';

const InsideTask = ({ state, setState }) => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const { id } = useParams();
  const { t } = React.useContext(I18nContext);
  let findTask = {};

  state.forEach(obj => {
    obj.tasks.find(item => {
      if (item.id === +id) {
        findTask = item;
      }
      return false;
    })
  })

  const getEditingTitle = (e) => {
    let newTasks = state.map(element => {
      if (element.tasks.length > 0) {
        return {
          ...element, tasks: element.tasks.map(item => {
            if (item.task === findTask.task) {
              return { ...item, task: e.target.value }
            }
            return item;
          })
        }
      }
      return element;
    });
    setState(newTasks);
  }

  const getEditingDescription = (e) => {
    let newTasks = state.map(element => {
      if (element.tasks.length > 0) {
        return {
          ...element, tasks: element.tasks.map(item => {
            if (item.task === findTask.task) {
              return { ...item, description: e.target.value }
            }
            return item;
          })
        }
      }
      return element;
    });
    setState(newTasks);
  }

  return (
    <div className={style.task}>
      <div className={style.wrapper}>
        <input
          onInput={getEditingTitle}
          className={style.title}
          defaultValue={findTask.task}
        />
        <span className={style.date}>{findTask.date}</span>
        <textarea
          className={style.text}
          defaultValue={findTask.description}
          placeholder={t('descriptionPlaceholder')}
          onChange={getEditingDescription}
        />
        <Button onClick={goBack} className={style.back}>
          <img src={back} alt={t('back')} />
        </Button>
      </div>
    </div>
  );
}

export default InsideTask;
