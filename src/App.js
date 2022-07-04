import React from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';
import style from './App.module.css';
import TodoListItem from './TodoListItem';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  const [todoList, setTodoList] = React.useState(
    []
  );

  const [isLoading, setIsLoading] = React.useState(true);  

  const getRecords = () => {

    fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      },
    }).then((response) => response.json()).then((result) => {
      setTodoList(result.records);
      setIsLoading(false);
      console.log(result.records);
    });
  }

  React.useEffect(() => {
    getRecords();
 }, []);

  React.useEffect(() => {

    if (!isLoading) {
    localStorage.setItem('savedTodoList', JSON.stringify(todoList));
  }
}, [todoList]);

  const addTodo = (newTodo) => {
    setIsLoading(true);
    const body = {
      "records": [{
          "fields": {
              "Title": newTodo.title
          }
      }]
  }
    fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      },    
    }).then(() => getRecords());
  };

  const removeTodo = (id) => {
    setIsLoading(true);
    fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      },    
    });
    setTimeout(getRecords(), 10000);
    
    //   (TodoListItem) => id !== TodoListItem.id
    // );
    // setTodoList(newTodoList);
  };
  return (
    <div className={style.container}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={
            <>
            <nav className={style.nav}>
              <ul className={style.navUL}>
                <li>
                  <a href = "/"> Home</a>
                </li>
                <li>
                  <a href='/new'>New Todo List</a>
                </li>
              </ul>
            </nav>
          <header>
              <h1 className={style.h1}>Todo List</h1>
            </header>
            <AddTodoForm onAddTodo={addTodo} />
            {isLoading ? (<p>Loading...</p>) : (
              <TodoList todoList={todoList} onRemoveTodo={removeTodo} />)}
              </>
          }/>
          <Route path="/new" element={
            <header>
              <h1>New Todo List</h1>
            </header>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
