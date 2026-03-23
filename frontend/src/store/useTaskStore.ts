import { create } from "zustand";
import api from "../api/axios";

interface Task {
  id: number;
  title: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
}

interface TaskState {
  tasks: Task[];
  fetchTasks: () => Promise<void>;
  updateTaskStatusLocal: (id: number, status: string) => void;
  logout: () => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  fetchTasks: async () => {
    const { data } = await api.get("/tasks");
    set({ tasks: data });
  },
  updateTaskStatusLocal: (id, status) => {
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, status: status as any } : t,
      ),
    }));
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ tasks: [] });
  },
}));
