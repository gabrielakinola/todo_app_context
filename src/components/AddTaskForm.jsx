import React from "react";
import { useState, useEffect } from "react";
import "./AddTaskForm.css";
import { toast } from "react-hot-toast";

const AddTaskForm = ({ addTask, taskToEdit }) => {
  const [inputValues, setInputValues] = useState({
    name: "",
    description: "",
    completed: false,
    id: new Date().getTime(),
  });

  //Prefill the form with the task to edit
  useEffect(() => {
    if (taskToEdit) {
      setInputValues(taskToEdit);
    }
  }, [taskToEdit]);

  function handleValidation({ name, description }) {
    if (!name || !description) {
      toast.error("Please fill all fields");
      return false;
    } else {
      return true;
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const id = new Date().getTime();
    setInputValues({ ...inputValues, id });
    const success = handleValidation(inputValues);

    if (!success) {
      return;
    }

    addTask(inputValues);

    setInputValues({
      name: "",
      description: "",
      completed: false,
      id: id,
    });
  };
  return (
    <form className="form-container" onSubmit={submitHandler}>
      <div className="input-task">
        <label htmlFor="inputTask">Task name</label>
        <input
          id="todo-text"
          type="text"
          placeholder="Enter task name"
          value={inputValues.name}
          onChange={(e) => {
            setInputValues({ ...inputValues, name: e.target.value });
          }}
        />
        <label htmlFor="task-description">Task Description</label>
        <textarea
          id="task-description"
          placeholder="Enter task description"
          value={inputValues.description}
          onChange={(e) => {
            setInputValues({ ...inputValues, description: e.target.value });
          }}
        ></textarea>
      </div>
      <button className="add-btn">Add Task</button>
    </form>
  );
};

export default AddTaskForm;
