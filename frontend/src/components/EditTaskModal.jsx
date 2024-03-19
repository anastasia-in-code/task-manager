import React, { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { StateActions, useTasksDispatch } from "../context/TasksContainer";
import TasksAPI from "../api/TasksAPI";

const EditTaskModal = (props) => {
  const dispatch = useTasksDispatch();
  const [title, setTitle] = useState(props.task.title);
  const [description, setDescription] = useState(props.task.description);
  const [completed, setCompleted] = useState(props.task.completed);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTitle(props.task.title);
    setDescription(props.task.description);
    setCompleted(props.task.completed);
  }, [props.task]);

  const handleSubmit = async () => {
    try {
      await TasksAPI.updateTask(props.task.id, title, description, completed);
      dispatch({
        type: StateActions.UPDATE_TASK,
        payload: {
          id: props.task.id,
          title,
          description,
          completed,
        },
      });
      props.onHide();
    } catch (e) {
      setError(e.message);
    }
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
        <Modal.Title id="contained-modal-title-vcenter">Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={handleTitleChange}
              maxLength={50}
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
              maxLength={255}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {error && (
          <div className="w-100 p-3">
            <Alert variant="danger">{error}</Alert>
          </div>
        )}
        <Button onClick={handleSubmit}>Update</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditTaskModal;
