import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import Navbar from "./components/Navbar.jsx"; // Assuming Navbar is correctly imported

export default function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  // Load todos from localStorage on component mount
  useEffect(() => {
    const todosString = localStorage.getItem("todos");
    if (todosString) {
      setTodos(JSON.parse(todosString));
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Toggle the visibility of completed tasks
  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  // Handle adding a new todo
  const handleAdd = () => {
    if (todo.trim().length < 3) return;
    setTodos([...todos, { id: uuidv4(), todo: todo.trim(), isCompleted: false }]);
    setTodo("");
  };

  // Handle editing a todo
  const handleEdit = (id) => {
    const todoToEdit = todos.find(item => item.id === id);
    if (todoToEdit) {
      setTodo(todoToEdit.todo);
      setTodos(todos.filter(item => item.id !== id));
    }
  };

  // Handle deleting a todo
  const handleDelete = (id) => {
    setTodos(todos.filter(item => item.id !== id));
  };

  // Handle toggling a todo's completion status
  const handleCheckbox = (id) => {
    setTodos(todos.map(item =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    ));
  };

  return (
    <>
      <Navbar />
      <div className=" mx-3 md:container md:mx-auto my-5 md:w-1/2 rounded-xl p-5 bg-violet-200 min-h-[80vh]">
        <h1 className="font-bold text-center text-2xl">Itask - Manage your todos at one place</h1>
        <div className="addtodo my-5 flex flex-col gap-4">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <div className="flex"><input
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
            type="text"
            className="w-full rounded-full px-5 py-1"
          />
          <button
            onClick={handleAdd}
            disabled={todo.trim().length < 3}
            className="bg-violet-600 hover:bg-violet-900 mx-2 p-2 py-1 text-sm font-bold text-white rounded-full"
          >
            Save
          </button></div>
        </div>
        <label className="my-4">
          <input
            onChange={toggleFinished}
            type="checkbox"
            checked={showFinished}
          />{" "}
          Show Finished
        </label>
        <div className='h-[1px] bg-black opacity-15 w-[90] mx-auto my-2'></div>
        <h2 className="text-lg font-bold">Your todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="my-3">No Todos To Display</div>}
          {todos.map(item => (
            (showFinished || !item.isCompleted) && (
              <div key={item.id} className="todo flex  justify-between my-3">
                <div className="flex gap-5">
                  <input
                    onChange={() => handleCheckbox(item.id)}
                    type="checkbox"
                    checked={item.isCompleted}
                  />
                  <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                </div>
                <div className="button flex h-full">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="bg-violet-600 hover:bg-violet-900 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-violet-600 hover:bg-violet-900 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                  >
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </>
  );
}
