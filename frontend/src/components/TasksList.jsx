import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

const TaskList = ({ tasks, selectedTask, setSelectedTask, setShowNewTaskForm }) => {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3"
      style={{ width: "280px", height: "100vh" }}
    >
      <div className="d-flex align-items-center mb-3 mb-md-0">
      <div className="d-flex align-items-center">

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          className="bi bi-card-checklist me-2"
          viewBox="0 0 16 16"
        >
          <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
          <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0M7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0" />
        </svg>
        <span className="fs-4">Tasks</span>
        </div>
        <a className="ms-auto cursor-pointer" onClick={() => setShowNewTaskForm(true)}>
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
        </a>
      </div>

      <hr />
      <div style={{ maxHeight: "calc(100vh - 100px)", overflowY: "auto" }}>
        <ListGroup>
          {tasks &&
            tasks.map((task) => (
              <ListGroup.Item
                key={task.id}
                onClick={() => setSelectedTask(task.id)}
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
