import React from 'react';
import style from '../../sass/Title.scss';

const Title = props => <h1 className={style.Title}>Todo App<br/><small>Liczba zadań do wykonania: {props.tasksCount}</small></h1>;

export default Title;