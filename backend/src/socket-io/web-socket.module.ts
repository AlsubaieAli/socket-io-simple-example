import { Module } from '@nestjs/common';
import { MainGateway } from './main.gateway';

@Module({
  imports: [],
  providers: [MainGateway],
  exports: [MainGateway],
})
export class WebSocketModule {}
