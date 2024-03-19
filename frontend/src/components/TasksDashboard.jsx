import React, { useEffect, useState } from "react";
import TaskList from "./TasksList";
import TaskDetails from "./TaskDetails";
import NewTaskModal from "./NewTaskModal";
import { useTasksDispatch, StateActions } from "../context/TasksContainer";
import TasksAPI from "../api/TasksAPI";
import Alert from "react-bootstrap/Alert";

const TasksDashboard = () => {
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useTasksDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
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
      } catch (e) {
        setError(e.message);
      }
    };
    fetchData();
  }, []);

  return (
      <div style={{ display: "flex" }}>
        <TaskList showNewTaskModal={() => setShowNewTaskForm(true)} />
        {error ? (
          <div className="w-100 position-absolute bottom-0 end-0 p-3">
            <Alert variant="danger">{error}</Alert>
          </div>
        ) : (
          <TaskDetails />
        )}
        {showNewTaskForm && !error && (
          <NewTaskModal
            show={showNewTaskForm}
            onHide={() => setShowNewTaskForm(false)}
          />
        )}
      </div>
  );
};

export default TasksDashboard;
