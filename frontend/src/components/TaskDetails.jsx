import React, { useState, useMemo } from "react";
import Card from "react-bootstrap/Card";
import EditTaskModal from "./EditTaskModal";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import {
  StateActions,
  useTasksState,
  useTasksDispatch,
} from "../context/TasksContainer";
import TasksAPI from "../api/TasksAPI";
import TrashIcon from "./icons/TrashIcon";
import PenIcon from "./icons/PenIcon";

export const TaskDetails = () => {
  const dispatch = useTasksDispatch();
  const [showEditTaskForm, setShowEditTaskForm] = useState(false);
  const { tasks, selectedTask } = useTasksState();

  const taskData = useMemo(
    () => tasks.find((task) => task.id === selectedTask),
    [tasks, selectedTask]
  );

  const handleTaskEdit = () => setShowEditTaskForm(true);

  const handleTaskDelete = async () => {
    try {
      await TasksAPI.deleteTask(taskData.id);
      dispatch({
        type: StateActions.DELETE_TASK,
        payload: taskData.id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const renderEditTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Edit task
    </Tooltip>
  );

  const renderDeleteTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Delete task
    </Tooltip>
  );

  return (
    <>
      {showEditTaskForm && (
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
                <OverlayTrigger
                  placement="left"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderEditTooltip}
                >
                  <button
                    onClick={handleTaskEdit}
                    className="icon-btn"
                    aria-label="Edit Task"
                  >
                    <PenIcon />
                  </button>
                </OverlayTrigger>

                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderEditTooltip}
                >
                  <button
                    onClick={handleTaskDelete}
                    className="icon-btn"
                    aria-label="Delete Task"
                  >
                    <TrashIcon />
                  </button>
                </OverlayTrigger>
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
