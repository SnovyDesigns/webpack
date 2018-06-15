import React from 'react';
import style from '../../sass/TodoList.scss';

const TodoList = props => {
    let {todos} = props || {};
    todos = todos.map((item) => {
        return (
            <li key={item.id}>{item.text}</li>
        );
    });
    return (
        <ul className={style.TodoList}>
            {todos}
        </ul>
    );
};

export default TodoList;