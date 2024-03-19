import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import {
  StateActions,
  useTasksState,
  useTasksDispatch,
} from "../context/TasksContainer";
import NoteIcon from "./icons/NoteIcon";

const TaskList = ({ showNewTaskModal }) => {
  const { tasks, selectedTask } = useTasksState();
  const dispatch = useTasksDispatch();

  const handleChangeSelection = (id) => {
    dispatch({
      type: StateActions.SET_SELECTED_TASK,
      payload: id,
    });
  };

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3"
      style={{ width: "280px", height: "100vh" }}
    >
      <div className="d-flex align-items-center mb-3 mb-md-0">
        <div className="d-flex align-items-center">
          <NoteIcon />
          <span className="fs-4">Tasks</span>
        </div>
        <button
          className="ms-auto icon-btn"
          onClick={showNewTaskModal}
          aria-label="Add Task"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            className="bi bi-file-earmark-plus"
            viewBox="0 0 16 16"
          >
            <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5" />
            <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z" />
          </svg>
        </button>
      </div>

      <hr />
      <div style={{ maxHeight: "calc(100vh - 100px)", overflowY: "auto" }}>
        <ListGroup>
          {tasks &&
            tasks.map((task) => (
              <ListGroup.Item
                key={task.id}
                onClick={() => handleChangeSelection(task.id)}
                active={task.id === selectedTask}
                className="d-flex justify-content-between align-items-center"
                style={{ cursor: "pointer" }}
              >
                {task.title}
              </ListGroup.Item>
            ))}
        </ListGroup>
      </div>
    </div>
  );
};

export default TaskList;
