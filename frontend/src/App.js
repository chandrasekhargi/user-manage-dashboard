import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import UserList from './pages/UserList';
import UserForm from './pages/UserForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1 className="logo">👥 User Management Dashboard</h1>
          <nav className="nav-links">
            <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
              Users
            </NavLink>
            <NavLink to="/add-user" className={({ isActive }) => (isActive ? "active" : "")}>
              Add User
            </NavLink>
          </nav>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/add-user" element={<UserForm />} />
            <Route path="/edit-user/:id" element={<UserForm />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>{new Date().getFullYear()} User Management Dashboard</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;

