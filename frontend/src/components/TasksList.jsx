import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import {
  StateActions,
  useTasksState,
  useTasksDispatch,
} from "../context/TasksContainer";
import NoteIcon from "./icons/NoteIcon";
import TasksIcon from "./icons/TasksIcon";

const TaskList = ({ showNewTaskModal }) => {
  const { tasks, selectedTask } = useTasksState();
  const dispatch = useTasksDispatch();

  const handleChangeSelection = (id) => {
    dispatch({
      type: StateActions.SET_SELECTED_TASK,
      payload: id,
    });
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Add new task
    </Tooltip>
  );

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
        <OverlayTrigger
          placement="left"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip}
        >
          <button
            className="ms-auto icon-btn"
            onClick={showNewTaskModal}
            aria-label="Add Task"
          >
            <TasksIcon />
          </button>
        </OverlayTrigger>
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
