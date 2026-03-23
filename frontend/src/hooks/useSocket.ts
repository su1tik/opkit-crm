import { useEffect } from "react";
import { io } from "socket.io-client";
import { useTaskStore } from "../store/useTaskStore";

export const useSocket = () => {
  const updateLocal = useTaskStore((state) => state.updateTaskStatusLocal);

  useEffect(() => {
    const socket = io("http://localhost:3000");

    socket.on("taskUpdated", (data: { id: number; status: string }) => {
      console.log("WS Update received:", data);
      updateLocal(data.id, data.status);
    });

    return () => {
      socket.disconnect();
    };
  }, [updateLocal]);
};
