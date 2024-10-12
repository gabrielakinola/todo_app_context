import "./App.css";
import AddTaskForm from "./components/AddTaskForm";
import TasksLists from "./components/TasksLists";
import { useEffect, useState } from "react";
import { useTodoContext } from "./context/TodoContext";
import { Toaster } from "react-hot-toast";
function App() {
  const { tasks, setTasks } = useTodoContext();
  const [taskToEdit, setTaskToEdit] = useState(null);

  // console.log(localStorage.getItem("tasks"));
  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem("tasks");
      // Only parse if there are tasks in localStorage
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      } else {
        setTasks([]); // Initialize with an empty array if there are no tasks
        localStorage.setItem("tasks", JSON.stringify([]));
      }
    } catch (error) {
      console.error("Error parsing tasks from localStorage:", error);
      setTasks([]); // Handle error by resetting to an empty array
    }
  }, [setTasks]);
  // Update localStorage whenever tasks change
  useEffect(() => {
    if (tasks.length >= 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTaskHandler = (task) => {
    console.log(taskToEdit);
    if (taskToEdit) {
      const updatedTasks = tasks.map((t) => {
        if (t.id === taskToEdit.id) {
          return task;
        }
        return t;
      });
      setTasks(updatedTasks);
      setTaskToEdit(null);
      return;
    }
    setTasks((prevTasks) => {
      return [...prevTasks, task];
    });
  };

  const editTaskHandler = (task) => {
    setTaskToEdit(task);
  };

  return (
    <div className="main-container">
      <Toaster />
      <div className="container">
        <AddTaskForm addTask={addTaskHandler} taskToEdit={taskToEdit} />
        <TasksLists tasks={tasks} onEditTask={editTaskHandler} />
      </div>
    </div>
  );
}

export default App;
