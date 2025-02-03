import PropTypes from "prop-types";
import { useState } from "react";

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [day, setDay] = useState("");
  const [reminder, setReminder] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!text) {
      setError("Por favor, adicione o nome de uma tarefa.");
      return;
    }
    setLoading(true);
    try {
      await onAdd({ text, day, reminder });
      setText("");
      setDay("");
      setReminder(false);
      setError("");
    } catch (error) {
      setError("Erro ao adicionar tarefa: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="card p-3 shadow-sm" onSubmit={onSubmit}>
      <h5 className="mb-3">Adicionar Tarefa</h5>
      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="btn-close" onClick={() => setError("")} aria-label="Close"></button>
        </div>
      )}
      <div className="mb-3">
        <label className="form-label">Tarefa</label>
        <input
          type="text"
          className="form-control"
          placeholder="Digite a tarefa"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Data & Hora</label>
        <input
          type="datetime-local"
          className="form-control"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </div>
      <div className="form-check mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          checked={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
        <label className="form-check-label">Ativar Lembrete</label>
      </div>
      <button type="submit" className="btn btn-primary w-100" disabled={loading}>
        {loading ? <span className="spinner-border spinner-border-sm"></span> : "Salvar Tarefa"}
      </button>
    </form>
  );
};

AddTask.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default AddTask;
