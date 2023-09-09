// App компонент является главным компонентом приложения Todo.

import React, { FC, useState, useEffect, useRef, ChangeEventHandler } from 'react';
import { TodoList } from './Todolist';
import { ITodo } from '../types/Data';
import { AppContainer, Header, Filters } from './App.styles';

const App: FC = () => {
    // Состояния для хранения введенного значения, списка задач и фильтра.
    const [value, setValue] = useState('');
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [filter, setFilter] = useState('all');

    // Ссылка на input элемент.
    const inputRef = useRef<HTMLInputElement>(null);

    // Обработчик изменения значения в поле ввода.
    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setValue(e.target.value);
    };

    // Добавление новой задачи.
    const addTodo = () => {
        if (value) {
            setTodos([
                ...todos,
                {
                    id: Date.now(),
                    title: value,
                    complete: false,
                },
            ]);
            setValue('');
        }
    };

    // Удаление задачи по ID.
    const removeTodo = (id: number): void => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    // Переключение состояния задачи по ID.
    const toggleTodo = (id: number): void => {
        setTodos(
            todos.map((todo) => {
                if (todo.id !== id) return todo;

                return {
                    ...todo,
                    complete: !todo.complete,
                };
            })
        );
    };

    // Функции для отображения задач с разными фильтрами.
    const showAll = () => {
        setFilter('all');
    };

    const showActive = () => {
        setFilter('active');
    };

    const showCompleted = () => {
        setFilter('completed');
    };

    // Фокус на поле ввода при монтировании компонента.
    useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
    }, []);

    // Сохранение данных в локальное хранилище при изменении задач или фильтра.
    useEffect(() => {
        const savedTodos = localStorage.getItem('todos');
        const savedFilter = localStorage.getItem('filter');
    
        if (savedTodos) {
            setTodos(JSON.parse(savedTodos));
        } else {
            // Если нет сохраненных задач, начните с пустого списка.
            setTodos([]);
        }
    
        if (savedFilter) {
            setFilter(savedFilter);
        } else {
            // Если нет сохраненного фильтра, установите значение по умолчанию ('all').
            setFilter('all');
        }
    }, []);
    

    // Загрузка данных из локального хранилища при загрузке компонента.
    useEffect(() => {
        if (todos.length) {
            localStorage.setItem('todos', JSON.stringify(todos));
            localStorage.setItem('filter', filter);
        } else {
            // Если список задач пуст, удаляем сохраненные данные.
            localStorage.removeItem('todos');
            localStorage.removeItem('filter');
        }
    }, [todos, filter]);
    

    // Фильтрация задач в зависимости от выбранного фильтра.
    const filteredTodos = () => {
        switch (filter) {
            case 'active':
                return todos.filter((todo) => !todo.complete);
            case 'completed':
                return todos.filter((todo) => todo.complete);
            default:
                return todos;
        }
    };

    return (
        <AppContainer>
            <Header>
                <h1>{`Создано ${todos.length} задач`}</h1>
                <input type="text" value={value} onChange={handleChange} ref={inputRef} />
                <button onClick={addTodo}>Добавить</button>
            </Header>
            <Filters>
                <button className={filter === 'all' ? 'active' : ''} onClick={showAll}>
                    Все задачи
                </button>
                <button className={filter === 'active' ? 'active' : ''} onClick={showActive}>
                    Активные задачи
                </button>
                <button className={filter === 'completed' ? 'active' : ''} onClick={showCompleted}>
                    Завершённые задачи
                </button>
            </Filters>
            <TodoList items={filteredTodos()} removeTodo={removeTodo} toggleTodo={toggleTodo} />
        </AppContainer>
    );
};

export default App;
