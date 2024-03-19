import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { StateActions, useTasksDispatch } from "../context/TasksContainer";
import TasksAPI from "../api/TasksAPI";

/**
 * Renders a modal window for adding a new task.
 * @param {Object} props - The props passed to the component.
 * @param {boolean} props.show - Controls the visibility of the modal.
 * @param {function} props.onHide - Handles the close event.
 * @returns {JSX.Element} - The rendered modal window.
 */
const NewTaskModal = (props) => {
  const dispatch = useTasksDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setValidated(true);

    const newTask = await TasksAPI.addNewTask(title, description, completed);

    dispatch({ type: StateActions.ADD_TASK, payload: newTask });

    props.onHide();
    setTitle("");
    setDescription("");
    setCompleted(false);
  };

  const handleTitleChange = (e) => {
    if (e.target.value.length <= 50) {
      setTitle(e.target.value);
    }
  };

  const handleDescriptionChange = (e) => {
    if (e.target.value.length <= 255) {
      setDescription(e.target.value);
    }
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
      <Form validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              required
              type="text"
              value={title}
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
              onChange={handleDescriptionChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">Add</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default NewTaskModal;
