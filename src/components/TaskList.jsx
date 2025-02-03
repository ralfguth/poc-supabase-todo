import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import taskService from "../service/taskService";
import AddTask from "./AddTask";
import Task from "./Task";
import { FaPlus, FaTimes } from "react-icons/fa";

const TaskList = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddTask, setShowAddTask] = useState(false);

  const fetchTasks = async () => {
    if (!user?.id) return;
    try {
      const data = await taskService.getTasks(user.id);
      setTasks(data?.filter(task => task !== null) || []);
    } catch (error) {
      setError("Erro ao buscar tarefas: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user]);

  const addTask = async (task) => {
    try {
      setLoading(true);
      const newTask = await taskService.addTask({ ...task, user_id: user.id });
      if (newTask) {
        setTasks((prevTasks) => [...prevTasks, newTask]);
      }
      await fetchTasks();
      setShowAddTask(false); // Fecha o formulário após adicionar a tarefa
    } catch (error) {
      setError("Erro ao adicionar tarefa: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
      await fetchTasks();
    } catch (error) {
      setError("Erro ao excluir tarefa: " + error.message);
    }
  };

  const toggleReminder = async (taskId) => {
    try {
      await taskService.updateTask(taskId, {
        reminder: !tasks.find((task) => task?.id === taskId)?.reminder,
      });
      await fetchTasks();
    } catch (error) {
      setError("Erro ao atualizar lembrete: " + error.message);
    }
  };

  return (
    <div className="card p-4 shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Minhas Tarefas</h4>
        <button
          className="btn btn-outline-primary rounded-circle transition"
          onClick={() => setShowAddTask(!showAddTask)}
          style={{ width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          {showAddTask ? <FaTimes /> : <FaPlus />}
        </button>
      </div>
      {showAddTask && <AddTask onAdd={addTask} />}
      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="btn-close" onClick={() => setError("")} aria-label="Close"></button>
        </div>
      )}
      {loading ? (
        <div className="d-flex justify-content-center mt-3">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      ) : tasks.length > 0 ? (
        <ul className="list-group mt-3">
          {tasks.map((task) =>
            task ? (
              <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center fade show">
                <Task task={task} onDelete={deleteTask} onToggle={toggleReminder} />
              </li>
            ) : null
          )}
        </ul>
      ) : (
        <p className="text-muted text-center mt-3">Nenhuma tarefa encontrada.</p>
      )}
    </div>
  );
};

TaskList.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default TaskList;
