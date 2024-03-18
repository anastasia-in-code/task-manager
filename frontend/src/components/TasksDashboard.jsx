import React, { useEffect, useState } from "react";
import TaskList from "./TasksList";
import TaskDetails from "./TaskDetails";

const TasksDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/tasks?page=1&per_page=100")
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <TaskList
        tasks={tasks}
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
      />
      <TaskDetails tasks={tasks} selectedTask={selectedTask} />
    </div>
  );
};

export default TasksDashboard;
