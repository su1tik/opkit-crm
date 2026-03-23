import { useEffect, useState } from "react";
import { useTaskStore } from "../store/useTaskStore";
import { useSocket } from "../hooks/useSocket";
import api from "../api/axios";

const STATUSES = ["TODO", "IN_PROGRESS", "DONE"];

export const Dashboard = () => {
  const { tasks, fetchTasks, logout } = useTaskStore();
  const [newTitle, setNewTitle] = useState("");

  useSocket();

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      await api.post("/tasks", { title: newTitle });
      setNewTitle("");
      fetchTasks();
    } catch (err) {
      alert("Ошибка при создании задачи");
    }
  };

  const changeStatus = async (id: number, status: string) => {
    try {
      await api.patch(`/tasks/${id}`, { status });
    } catch (err) {
      alert("Ошибка при смене статуса");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1000px",
        margin: "0 auto",
        fontFamily: "sans-serif",
      }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}>
        <h1>OpKit CRM</h1>
        <button
          onClick={() => {
            logout();
            window.location.reload();
          }}
          style={{ padding: "8px 16px", cursor: "pointer" }}>
          Выйти
        </button>
      </header>

      <form
        onSubmit={handleCreateTask}
        style={{ marginBottom: "40px", display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="Название новой задачи..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}>
          Добавить задачу
        </button>
      </form>

      <div style={{ display: "flex", gap: "20px" }}>
        {STATUSES.map((status) => (
          <div
            key={status}
            style={{
              flex: 1,
              background: "#f4f4f4",
              padding: "15px",
              borderRadius: "8px",
              minHeight: "400px",
            }}>
            <h3
              style={{
                textAlign: "center",
                borderBottom: "2px solid #ddd",
                paddingBottom: "10px",
              }}>
              {status === "TODO"
                ? "📋 ТУДУ"
                : status === "IN_PROGRESS"
                  ? "⏳ В РАБОТЕ"
                  : "✅ ГОТОВО"}
            </h3>

            {tasks
              .filter((t) => t.status === status)
              .map((task) => (
                <div
                  key={task.id}
                  style={{
                    background: "white",
                    padding: "15px",
                    margin: "15px 0",
                    borderRadius: "6px",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  }}>
                  <h4 style={{ margin: "0 0 10px 0" }}>{task.title}</h4>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}>
                    <label style={{ fontSize: "12px", color: "#666" }}>
                      Сменить статус:
                    </label>
                    <select
                      value={task.status}
                      onChange={(e) => changeStatus(task.id, e.target.value)}
                      style={{ padding: "5px", cursor: "pointer" }}>
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};
