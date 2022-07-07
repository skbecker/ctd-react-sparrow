import React from 'react';
import TodoListItem from './TodoListItem';
import style from './App.module.css';
import PropTypes from 'prop-types';

//this file renders the todo list on the page

const TodoList = ({ todoList, onRemoveTodo }) => { 
  return (
    < ul className= {style.ul}>
    {
      todoList.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} onRemoveTodo={onRemoveTodo}/>
      ))
    }
      </ul >
    )
  }

TodoList.propTypes = {
  todoList: PropTypes.array,
  onRemoveTodo: PropTypes.func
}

export default TodoList;