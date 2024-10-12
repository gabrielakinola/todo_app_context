import { createContext, useContext, useState } from "react";

// Create a context
const TodoContext = createContext();

// Create a custom hook for using the TodoContext
export const useTodoContext = () => {
  return useContext(TodoContext);
};

// Create a context provider
export const TodoContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  return (
    <TodoContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TodoContext.Provider>
  );
};
