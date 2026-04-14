import React from 'react';
import Board from '../board/Board';
import style from './main.module.css';


const Main = ({ state, setState }) => {

  return (
    <main className={style.main}>
      <div className={style.container}>
        <Board state={state} setState={setState} />
      </div>
    </main>
  );
}

export default Main;
