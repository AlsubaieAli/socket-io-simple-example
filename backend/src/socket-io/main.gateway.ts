import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MainGateway implements OnGatewayConnection {
  @WebSocketServer() protected readonly server: Server;

  async handleConnection(client: any) {
    console.log('someone connected');
    await this.stall(500);
    this.server.emit('new-connection', 'YAY! New connection established');

    // Making the client join a room so we can emit directly to it later
    client.join(`${client.id}`);
  }

  async stall(stallTime = 1000) {
    return await new Promise((resolve) => setTimeout(resolve, stallTime));
  }

  emit(eventName: string, payload: any) {
    this.server.emit(eventName, payload);
  }

  emitTo(target: string, eventName: string, payload: any) {
    this.server.to(target).emit(eventName, payload);
  }
}
