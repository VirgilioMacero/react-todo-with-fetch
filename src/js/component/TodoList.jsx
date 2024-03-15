import React, { useState, useEffect } from "react";
import Todo from "./Todo";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    getItems();
  }, []);

  async function getItems() {
    const responde = await fetch(
      "https://playground.4geeks.com/apis/fake/todos/user/VirgilioM"
    );

    const todos = await responde.json();

    setTodos(todos);
  }

  async function deleteItem(id) {
    const deletedValue = todos.filter((value) => value.id !== id);
    setTodos(deletedValue);
    await fetch(
      "https://playground.4geeks.com/apis/fake/todos/user/VirgilioM",
      {
        method: "PUT",
        body: JSON.stringify(deletedValue),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
  async function onChangeState(id) {
    const todosCopy = [...todos];
    const todoIndex = todosCopy.findIndex((todo) => todo.id === id);

    const updatedTodo = { ...todosCopy[todoIndex] };

    updatedTodo.done = !updatedTodo.done;
    todosCopy[todoIndex] = updatedTodo;
    setTodos(todosCopy);

    await fetch(
      "https://playground.4geeks.com/apis/fake/todos/user/VirgilioM",
      {
        method: "PUT",
        body: JSON.stringify(todosCopy),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  async function addTodo() {
    const newTodos = [...todos, { done: false, label: input, id: "ffff" }];

    setTodos(newTodos);

    await fetch(
      "https://playground.4geeks.com/apis/fake/todos/user/VirgilioM",
      {
        method: "PUT",
        body: JSON.stringify(newTodos),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.error(error));
  }

  return (
    <div className="container" style={{ marginTop: "16rem" }}>
      <div className="row  mb-3">
        <div className="input-group">
          <span className="input-group-text " id="inputGroup-sizing-default">
            Insert a To Do
          </span>
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
            }}
          ></input>
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
            onClick={addTodo}
          >
            Add
          </button>
        </div>
      </div>
      <div className="row px-8 gap-4 row-cols-5">
        {todos
          ? todos.map((value, index) => {
              return (
                <Todo
                  id={value.id}
                  text={value.label}
                  state={value.done}
                  onDelete={deleteItem}
                  onChangeState={onChangeState}
                />
              );
            })
          : ""}
      </div>
    </div>
  );
}
