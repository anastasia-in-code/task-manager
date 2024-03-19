import React, {useState, useMemo, useEffect} from "react";
import ListGroup from "react-bootstrap/ListGroup";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Form from "react-bootstrap/Form";
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
  const [showOnlyActive, setShowOnlyActive] = useState(false);
  const dispatch = useTasksDispatch();

  const shownTasks = useMemo(() => showOnlyActive ? tasks.filter(task => task.completed !== showOnlyActive) : tasks, [showOnlyActive, tasks]);

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
          overlay={<TaskTooltip />}
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
      <Form>
        <Form.Check
          type="switch"
          id="custom-switch"
          label="Show only active"
          onChange={(e) => setShowOnlyActive(e.target.checked)}
        />
      </Form>

      <hr />
      <div style={{ maxHeight: "calc(100vh - 100px)", overflowY: "auto" }}>
        <ListGroup>
          {shownTasks &&
            shownTasks.map((task) => (
              <ListGroup.Item
                key={task.id}
                onClick={() => dispatch({ type: StateActions.SET_SELECTED_TASK, payload: task.id })}
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

const TaskTooltip = () => {
  return (
    <Tooltip id="button-tooltip">
      Add new task
    </Tooltip>
  );
};

export default TaskList;
