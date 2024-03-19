import React, { createContext, useContext, useReducer } from "react";

export const StateActions = {
  SET_TASKS: "SET_TASKS",
  SET_SELECTED_TASK: "SET_SELECTED_TASK",
  ADD_TASK: "ADD_TASK",
  UPDATE_TASK: "UPDATE_TASK",
  DELETE_TASK: "DELETE_TASK"
};

const initialState = {
  tasks: [],
  selectedTask: null,
};

const TasksContext = createContext(initialState);
const TasksDispatchContext = createContext(() => {});

const tasksReducer = (state, action) => {
  switch (action.type) {
    case StateActions.SET_TASKS:
      return { ...state, tasks: action.payload };
    case StateActions.SET_SELECTED_TASK:
      return { ...state, selectedTask: action.payload };
    case StateActions.ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.payload], selectedTask: action.payload.id };
    case StateActions.UPDATE_TASK:
      return { ...state, tasks: state.tasks.map(task => task.id == action.payload.id ? action.payload : {...task}) };
    case StateActions.DELETE_TASK:
        return { ...state, tasks: [...state.tasks.filter(task => task.id !== action.payload)] };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const TasksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tasksReducer, initialState);

  return (
    <TasksContext.Provider value={state}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
};

export const useTasksState = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasksState must be used within a TasksProvider");
  }
  return context;
};

export const useTasksDispatch = () => {
  const context = useContext(TasksDispatchContext);
  if (!context) {
    throw new Error("useTasksDispatch must be used within a TasksProvider");
  }
  return context;
};
