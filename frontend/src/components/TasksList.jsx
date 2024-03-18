import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

const TaskList = ({ tasks, selectedTask, setSelectedTask }) => {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3"
      style={{ width: "280px", height: "100vh" }}
    >
      <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-card-checklist me-2"
          viewBox="0 0 16 16"
        >
          <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
          <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0M7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0" />
        </svg>
        <span className="fs-4">Tasks</span>
      </div>

      <hr />
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
  );
};

export default TaskList;
