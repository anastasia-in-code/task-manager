import "bootstrap/dist/css/bootstrap.min.css";
import React, {useState, useEffect} from 'react'
import TasksDashboard from "./components/TasksDashboard";
import { TasksProvider } from "./context/TasksContainer";
import Auth from "./components/Auth";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <TasksProvider>
          <TasksDashboard setIsLoggedIn={setIsLoggedIn} />
        </TasksProvider>
      ) : (
        <Auth onLogin={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
}

export default App;
