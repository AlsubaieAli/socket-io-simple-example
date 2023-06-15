import { Injectable } from '@nestjs/common';
import { MainGateway } from './socket-io/main.gateway';

@Injectable()
export class AppService {
  // Inject gateway
  constructor(private readonly mainGateway: MainGateway) {}

  async getHello() {
    this.simulateLongJobProcess();
    await this.mainGateway.stall();
    return { message: 'BE Response Arrived!' };
  }

  private simulateLongJobProcess(): void {
    // Emit event every 2 seconds
    let i = 1;
    const interval = setInterval(() => {
      this.mainGateway.emit('new-message', `Here is item ${i}`);
      i++;
      if (i >= 6) {
        clearInterval(interval);
        this.mainGateway.emit('new-message', 'DONE!');
      }
    }, 2000);
  }
}
