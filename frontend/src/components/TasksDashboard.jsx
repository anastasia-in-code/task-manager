import React, { useEffect, useState } from "react";
import TaskList from "./TasksList";
import TaskDetails from "./TaskDetails";
import NewTaskModal from "./NewTaskModal";
import {
  useTasksDispatch,
  StateActions,
} from "../context/TasksContainer";

const TasksDashboard = () => {
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const dispatch = useTasksDispatch();

  useEffect(() => {
    fetch("http://127.0.0.1:5000/tasks?page=1&per_page=100")
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: StateActions.SET_TASKS,
          payload: data,
        });
        if (data.length) {
          dispatch({
            type: StateActions.SET_SELECTED_TASK,
            payload: data[0].id,
          });
        }
      });
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <TaskList setShowNewTaskForm={setShowNewTaskForm} />
      <NewTaskModal
        show={showNewTaskForm}
        onHide={() => setShowNewTaskForm(false)}
      />
      <TaskDetails />
    </div>
  );
};

export default TasksDashboard;
