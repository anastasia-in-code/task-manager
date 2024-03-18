import "bootstrap/dist/css/bootstrap.min.css";
import TasksDashboard from "./components/TasksDashboard";
import { TasksProvider } from "./context/TasksContainer";

function App() {
  return (
    <div>
      <TasksProvider>
        <TasksDashboard />
      </TasksProvider>
    </div>
  );
}

export default App;
