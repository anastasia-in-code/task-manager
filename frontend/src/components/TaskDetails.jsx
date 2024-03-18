import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import EditTaskModal from "./EditTaskModal";
import {
  StateActions,
  useTasksState,
  useTasksDispatch,
} from "../context/TasksContainer";

export const TaskDetails = () => {
  const [showEditTaskForm, setShowEditTaskForm] = useState(false);
  const { tasks, selectedTask } = useTasksState();
  const dispatch = useTasksDispatch();
  const taskData = tasks.find((task) => task.id === selectedTask);

  const handleTaskEdit = () => setShowEditTaskForm(true);

  const handleTaskDelete = () => {
    fetch(`http://127.0.0.1:5000/tasks/${taskData.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          dispatch({
            type: StateActions.DELETE_TASK,
            payload: taskData.id
          })
        } else {
          console.error("Error deleting task:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  return (
    <>
      {taskData && (
        <EditTaskModal
          show={showEditTaskForm}
          task={taskData}
          onHide={() => setShowEditTaskForm(false)}
        />
      )}

      <Card style={{ width: "100%" }}>
        {taskData && (
          <Card.Body>
            <Card.Title
              className="d-flex justify-content-between align-items-center"
              style={{ fontSize: "1.5rem" }}
            >
              <span>{taskData.title}</span>
              <div>
                <a onClick={handleTaskEdit} className="cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-pen"
                    viewBox="0 0 16 16"
                  >
                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
                  </svg>
                </a>
                <a onClick={handleTaskDelete} className="cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-trash3 mx-5"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                  </svg>
                </a>
              </div>
            </Card.Title>
            <Card.Text>
              Status:{" "}
              <span
                style={{
                  color: taskData.completed ? "green" : "red",
                  fontSize: "1.2rem",
                }}
              >
                {taskData.completed ? "completed" : "active"}
              </span>
            </Card.Text>
            <Card.Text>{taskData.description}</Card.Text>
          </Card.Body>
        )}
      </Card>
    </>
  );
};

export default TaskDetails;
