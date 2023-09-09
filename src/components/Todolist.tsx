// TodoList компонент отображает список задач.

import { FC } from 'react';
import { ITodo } from '../types/Data';
import TodoItem from './Todoitem';

interface ITodoListProps {
    items: ITodo[];
    removeTodo: (id: number) => void;
    toggleTodo: (id: number) => void;
}

const TodoList: FC<ITodoListProps> = ({ items, removeTodo, toggleTodo }) => {
    return (
        <div>
            {items.map((todo) => (
                <TodoItem key={todo.id} removeTodo={removeTodo} toggleTodo={toggleTodo} todo={todo} />
            ))}
        </div>
    );
};

export { TodoList };
