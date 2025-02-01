import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Проверка авторизации при загрузке компонента
    if (localStorage.getItem("user")) {
      setIsAuthenticated(true);
      console.log("Пользователь авторизован");
    } else {
      console.log("Пользователь не авторизован");
    }
  }, []);

  const handleLogout = () => {
    // Удаляем пользователя из localStorage
    localStorage.removeItem("user");
    setIsAuthenticated(false); // Обновляем состояние
    console.log("Выход из аккаунта");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">🏠 RealtorApp</Link>
      </div>
      <nav className="nav">
        {isAuthenticated ? (
          <div className="profile-menu">
            <Link to="/favorites" className="nav-link">
              Любимые объекты
            </Link>
            <Link to="/profile" className="nav-link profile">
              Профиль
            </Link>
            <button onClick={handleLogout} className="logout-btn">
              Выйти
            </button>
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="nav-link auth">
              Log In
            </Link>
            <Link to="/reg" className="nav-link auth">
              Sign Up
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
