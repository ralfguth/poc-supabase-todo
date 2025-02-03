import { useEffect, useState } from "react";
import authService from "./service/authService";
import Header from "./components/Header";
import Login from "./components/Login";
import TaskList from "./components/TaskList";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await authService.getSession();
      if (session) {
        setUser(session.user);
      }
    };
    fetchSession();

    const { data: authListener } = authService.onAuthStateChange((user) => {
      setUser(user);
    });
    return () => authListener.subscription.unsubscribe();
  }, []);

  return (
    <div className="container mt-5 pt-5">
      <Header user={user} />
      <div className="mt-4">
        {user ? <TaskList user={user} /> : <Login />}
      </div>
    </div>
  );
}

export default App;
