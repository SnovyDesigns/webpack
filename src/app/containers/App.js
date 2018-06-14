import style from '../../sass/App.scss';

import React from 'react';
import uuid from 'uuid';
import Title from '../components/Title';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
    }
    addTodo(val) {
        const todo = {
            text: val,
            id: uuid.v4()
        };
        const data = [...this.state.data, todo];
        this.setState({data});
    }
    removeTodo(id) {
        const remainder = this.state.data.filter(todo => todo.id !== id);
        this.setState({data: remainder});
    }
    render() {
        console.log('Test');
        return (
            <div className={style.TodoApp}>
                <Title tasksCount={this.state.data.length} />
                Tutaj pojawią się komponenty naszej aplikacji.
            </div>
        );
    }
}
