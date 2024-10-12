import React from "react";
import "./Task.css";
import { useTodoContext } from "../context/TodoContext";

const Task = ({ task, editTask }) => {
  const { tasks, setTasks } = useTodoContext();
  const removeHandler = () => {
    const newTasks = tasks.filter((t) => t.id !== task.id);
    setTasks(newTasks);
  };

  const toggleCompleteHandler = () => {
    const newTasks = tasks.map((t) => {
      if (t.id === task.id) {
        return { ...t, completed: !t.completed };
      }
      return t;
    });
    setTasks(newTasks);
  };

  return (
    <div className="tasks-list">
      <div className="task-desc-cont">
        <div className="task-desc">
          <h3 className="tasks-item">{task.name}</h3>
          <p className="tasks-item">{task.description}</p>
        </div>
      </div>
      <div className="task-actions">
        <button
          className="edit button"
          onClick={() => {
            editTask(task);
          }}
        >
          Edit
        </button>
        <button className="remove-button" onClick={removeHandler}>
          Remove
        </button>
        <div className="check-div">
          <label htmlFor="">
            {task.completed ? `Mark as undone` : `Mark as done`}
          </label>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={toggleCompleteHandler}
            className="complete-checkbox"
          />
        </div>
      </div>
    </div>
  );
};

export default Task;
