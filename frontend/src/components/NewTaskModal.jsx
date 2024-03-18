import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { StateActions, useTasksDispatch } from "../context/TasksContainer";

const NewTaskModal = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const dispatch = useTasksDispatch();

  const handleSubmit = () => {
    fetch("http://127.0.0.1:5000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, completed }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Parse the JSON response
        } else {
          throw new Error(`Error adding task: ${response.statusText}`);
        }
      })
      .then((data) => {
        dispatch({ type: StateActions.ADD_TASK, payload: data });
        props.onHide();
        setTitle("");
        setDescription("");
      })
      .catch((error) => {
        console.error("Error adding task:", error);
      });
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCompletedChange = (e) => {
    setCompleted(e.target.checked);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add New Task
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={handleTitleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Completed"
              checked={completed}
              onChange={handleCompletedChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={description}
              onChange={handleDescriptionChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit}>Add</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewTaskModal;
