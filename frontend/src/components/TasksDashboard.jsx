import React, { useEffect, useState } from "react";
import TaskList from "./TasksList";
import TaskDetails from "./TaskDetails";
import NewTaskModal from "./NewTaskModal";
import { useTasksDispatch, StateActions } from "../context/TasksContainer";
import TasksAPI from "../api/TasksAPI";

const TasksDashboard = () => {
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const dispatch = useTasksDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const tasks = await TasksAPI.getTasks();
      dispatch({
        type: StateActions.SET_TASKS,
        payload: tasks,
      });
      if (tasks.length) {
        dispatch({
          type: StateActions.SET_SELECTED_TASK,
          payload: tasks[0].id,
        });
      }
    };
    fetchData();
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
