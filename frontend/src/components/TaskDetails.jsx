import React from "react";
import Card from "react-bootstrap/Card";

export const TaskDetails = ({ tasks, selectedTask }) => {
  const taskData = tasks.find((task) => task.id === selectedTask);
  return (
    <Card style={{ width: "100%" }}>
      {taskData && (
        <Card.Body>
          <Card.Title style={{ fontSize: "1.5rem" }}>{taskData.title}</Card.Title>
          <Card.Text>
            Status:{" "}
            <span style={{ color: taskData.completed ? "green" : "red", fontSize: "1.2rem" }}>
              {taskData.completed ? "completed" : "active"}
            </span>
          </Card.Text>
          <Card.Text>{taskData.description}</Card.Text>
        </Card.Body>
      )}
    </Card>
  );
};

export default TaskDetails;