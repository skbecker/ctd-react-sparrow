import React from 'react';
import style from './App.module.css';
import PropTypes from 'prop-types';

const InputWithLabel = ({
    id,
    todoTitle,
    type='text',
    handleTitleChange,
    isFocused,
    children,
}) => {
    const inputRef = React.useRef();

    React.useEffect(() => {
           if (isFocused && inputRef.current){
               inputRef.current.focus();
           }
    }, [isFocused]);

    return (
        <>
            <label htmlFor={id}>{children}</label>
            <input
                className={style.input}
                name="title"
                type={type}
                id={id}
                ref={inputRef}
                value={todoTitle}
                onChange={handleTitleChange}>
            </input>
        </>
    );
};

InputWithLabel.propTypes = {
    id: PropTypes.string,
    todoTitle: PropTypes.string,
    handleTitleChange: PropTypes.func,
    isFocused: PropTypes.bool,
    children: PropTypes.string
}

export default InputWithLabel;