import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

// Разрешаем CORS для фронтенда
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class TasksGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('TasksGateway');

  // Метод для отправки уведомления всем подключенным клиентам
  sendTaskUpdate(payload: { id: number; status: string; updatedAt: Date }) {
    this.server.emit('taskUpdated', {
      id: payload.id,
      status: payload.status,
      timestamp: payload.updatedAt,
    });
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}
