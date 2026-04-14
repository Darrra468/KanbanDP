import React, { useState } from 'react';
import add from './add.svg';
import style from './add.module.css';
import Input from '../UI/input/Input';
import Dropdown from '../UI/dropdown/Dropdown';
import Button from '../UI/button/Button';

const Add = ({ children, tasks, title, state, ...props }) => {
  const [btnCondition, setBtnCondition] = useState(false);

  const getTitle = title => {
    if (title === 'Backlog') {
      return true;
    }
    return false;
  }

  const disableButton = title => {
    switch (title) {
      case 'Backlog':
        return true;
      case 'Ready':
        return state.find(item => item.title === 'Backlog').tasks.length ? true : false;
      case 'In Progress':
        return state.find(item => item.title === 'Ready').tasks.length ? true : false;
      case 'Finished':
        return state.find(item => item.title === 'In Progress').tasks.length ? true : false;
      default:
        return false;
    }
  }

  return (
    <>
      {btnCondition
        ? <>{getTitle(title, tasks) ?
          <Input state={state} setState={props.setState} setBtnCondition={setBtnCondition} />
          :
          <Dropdown state={state} setState={props.setState} title={title} setBtnCondition={setBtnCondition} />
        }</>
        :
        <>{disableButton(title)
          ? <Button className={style.button} onClick={() => setBtnCondition(true)}>
            <img src={add} alt={props.alt} />
            {children}
          </Button>
          : <Button className={style.button} style={{ opacity: 0.7 }}>
            <img src={add} alt={props.alt} />
            {children}
          </Button>
        }
        </>
      }
    </>
  );
}

export default Add;
