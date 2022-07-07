import React from 'react';
import style from './App.module.css';
import PropTypes from 'prop-types';

//this file renders each item in the to do list

function TodoListItem({ todo, onRemoveTodo }) {
    return (
        <li className={style.ListItem}>{todo.fields.Title} <button className = {style.removeButton} role="button" type="button" onClick={() => onRemoveTodo(todo.id)}>Remove</button></li>
    );
}

TodoListItem.propTypes = {
    todo: PropTypes.object,
    onRemoveTodo: PropTypes.func
}

export default TodoListItem;