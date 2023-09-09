// TodoItem компонент отображает отдельную задачу в списке дел.

import React, { FC, useState, ChangeEventHandler } from 'react';
import { ITodo } from '../types/Data';

interface ITodoItem {
    removeTodo: (id: number) => void;
    toggleTodo: (id: number) => void;
    todo: ITodo;
}

const TodoItem: FC<ITodoItem> = ({ removeTodo, toggleTodo, todo }) => {
    // Состояния для редактирования задачи и ее текста.
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState<string>(todo.title);
    const [editedTodo, setEditedTodo] = useState<ITodo | null>(null);

    // Обработчик изменения текста задачи.
    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setEditedText(e.target.value);
    };

    // Обработчик нажатия на кнопку редактирования задачи.
    const handleEditClick = () => {
        setEditedTodo(todo);
        setIsEditing(true);
    };

    // Обработчик нажатия на кнопку сохранения изменений.
    const handleSaveClick = () => {
        if (editedText.trim() !== '') {
            if (editedTodo) {
                editedTodo.title = editedText;
                setEditedTodo(editedTodo);
            }
            setIsEditing(false);
        }
    };

    return (
        <div>
            <input type="checkbox" checked={todo.complete} onChange={() => toggleTodo(todo.id)} />
            {isEditing ? (
                <>
                    <input type="text" value={editedText} onChange={handleChange} />
                    <button onClick={handleSaveClick}>Сохранить</button>
                </>
            ) : (
                <>
                    {todo.complete ? <del>{todo.title}</del> : todo.title}
                    <button onClick={handleEditClick}>Редактировать</button>
                    <button onClick={() => removeTodo(todo.id)}>Удалить</button>
                </>
            )}
        </div>
    );
};

export default TodoItem;
