import PropTypes from "prop-types";
import authService from "../service/authService";

export default function Header({ user }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top w-100 shadow-sm">
      <div className="container-fluid d-flex justify-content-between align-items-center px-3">
        <span className="navbar-brand">Lista de Tarefas</span>
        <div>
          {user ? (
            <>
              <span className="me-3">{user.email}</span>
              <button className="btn btn-outline-danger" onClick={authService.signOut}>
                Logout
              </button>
            </>
          ) : (
            <button className="btn btn-primary">Login</button>
          )}
        </div>
      </div>
    </nav>
  );
}

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }),
};