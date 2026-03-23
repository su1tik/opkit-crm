import { useState } from "react";
import api from "../api/axios";

export const Auth = ({ onLogin }: { onLogin: () => void }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const { data } = await api.post(endpoint, { email, password });
      localStorage.setItem("token", data.access_token);
      onLogin();
    } catch (err) {
      alert("Ошибка авторизации");
    }
  };

  return (
    <div
      style={{ maxWidth: "300px", margin: "100px auto", textAlign: "center" }}>
      <h2>{isLogin ? "Вход" : "Регистрация"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isLogin ? "Войти" : "Создать аккаунт"}</button>
      </form>
      <button
        onClick={() => setIsLogin(!isLogin)}
        style={{
          marginTop: "10px",
          background: "none",
          border: "none",
          color: "blue",
          cursor: "pointer",
        }}>
        {isLogin ? "Нет аккаунта? Регистрация" : "Уже есть аккаунт? Войти"}
      </button>
    </div>
  );
};
