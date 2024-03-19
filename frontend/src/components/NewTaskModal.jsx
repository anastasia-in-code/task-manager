import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import { StateActions, useTasksDispatch } from "../context/TasksContainer";
import TasksAPI from "../api/TasksAPI";

const NewTaskModal = ({ show, onHide }) => {
  const dispatch = useTasksDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setValidated(true);
    setError(null); // Reset the error state

    try {
      const newTask = await TasksAPI.addNewTask(
        title.trim(),
        description.trim(),
        completed
      );

      dispatch({ type: StateActions.ADD_TASK, payload: newTask });

      onHide();
      setTitle("");
      setDescription("");
      setCompleted(false);
    } catch (e) {
      setError(e.message);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value.trim());
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value.trim());
  };

  const handleCompletedChange = (e) => {
    setCompleted(e.target.checked);
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add New Task
        </Modal.Title>
      </Modal.Header>
      <Form validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              required
              type="text"
              value={title}
              maxLength={50}
              onChange={handleTitleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a Title.
            </Form.Control.Feedback>
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
              maxLength={255}
              onChange={handleDescriptionChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          {error && (
            <div className="w-100 p-3">
              <Alert variant="danger">{error}</Alert>
            </div>
          )}
          <Button type="submit">Add</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default NewTaskModal;
