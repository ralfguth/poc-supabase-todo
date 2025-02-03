import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa";

const Task = ({ task, onDelete, onToggle }) => {

  if (!task) {
    return <p className="text-danger">Erro ao carregar tarefa</p>;
  }

  return (
    <div
      className={`task ${task.reminder ? "reminder" : ""}`}
      onDoubleClick={() => onToggle(task.id)}
    >
      <h3>
        {task.text} {" "}
        <FaTimes
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => onDelete(task.id)}
        />
      </h3>
      <p>{new Date(task.day).toLocaleString()}</p>
    </div>
  );
};

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    day: PropTypes.string.isRequired,
    reminder: PropTypes.bool.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default Task;
