import { createContext, useContext, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

const TodoContext = createContext();

const initialTodos = [
  {
    id: uuidv4(),
    taskName: "Buy groceries",
    createdTime: new Date().toISOString(),
    updatedTime: new Date().toISOString(),
    isCompleted: false,
    priority: "high",
    tags :["shopping"]
  },
  {
    id: uuidv4(),
    taskName: "Complete React project",
    createdTime: new Date().toISOString(),
    updatedTime: new Date().toISOString(),
    isCompleted: false,
    priority: "medium",
    tags :["work"]
  },
  {
    id: uuidv4(),
    taskName: "Go for a run",
    createdTime: new Date().toISOString(),
    updatedTime: new Date().toISOString(),
    isCompleted: true,
    priority: "low",
    tags :["health"]
  },
];

const todoReducer = (state, action) => {
  switch (action.type) {
    
    case "ADD_TASK":
      console.log(action.payload)
      return [
        ...state,
        {
          id: uuidv4(),
          taskName: action.payload.taskName,
          createdTime: new Date().toISOString(),
          updatedTime: new Date().toISOString(),
          isCompleted: false,
          tags : action.payload.tags,
          priority: action.payload.priority || "medium",
        },
      ];
    case "UPDATE_TASK":
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...task, ...action.payload, updatedTime: new Date().toISOString() }
          : task
      );
    case "DELETE_TASK":      
      return state.filter((task) => task.id !== action.payload);
    case "TOGGLE_COMPLETE":
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...task, isCompleted: !task.isCompleted, updatedTime: new Date().toISOString() }
          : task
      );
    default:
      return state;
  }
};

export const TodoProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(todoReducer, initialTodos);

  return (
    <TodoContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  return useContext(TodoContext);
};
