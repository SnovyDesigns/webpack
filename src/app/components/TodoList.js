import React from 'react';
import style from '../../sass/TodoList.scss';

const TodoList = props => {
    let {todos, removeTodo} = props || {};
    todos = todos.map((item, index) => {
        return (
            <li key={item.id}>{item.text} <span>x</span></li>
        );
    });
    return (
        <ul className={style.TodoList}>
            {todos}
        </ul>
    );
};

export default TodoList;