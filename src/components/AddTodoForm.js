import React from 'react';
import InputWithLabel from './InputWithLabel';
import style from './App.module.css';
import PropTypes from 'prop-types';

// this file renders the form where each todo item is entered to create the todolist

function AddTodoForm( { onAddTodo }) {
    const [todoTitle, setTodoTitle] = React.useState(''); //this item controls the state of the input field on the form
    //this function is an event handler for when the value is changed in the input field
    const handleTitleChange = (event) => {
        let newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    }

    //this function is an event handler for the submit 
    const handleAddTodo = (event) => {
        //prevents the page from reloading
        event.preventDefault();

        //
        onAddTodo( {
            title: todoTitle,
            id: Date.now()
        });
        setTodoTitle('');
    }
    return (
        <form className={style.form} id="todoForm" onSubmit={handleAddTodo}>
            <InputWithLabel isFocused todoTitle={todoTitle} handleTitleChange={handleTitleChange}>
                Title
            </InputWithLabel>
            <button className={style.addButton} role="button" type ="submit">Add</button>
        </form>
    );
}

AddTodoForm.propTypes = {
    onAddTodo: PropTypes.func
}

export default AddTodoForm;