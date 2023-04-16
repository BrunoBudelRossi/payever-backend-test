import { Module } from '@nestjs/common';
import AmqpConnection from 'amqp-connection-manager';

@Module({
  providers: [
    {
      provide: 'AMQP_CONNECTION',
      useFactory: async () => {
        return await AmqpConnection.connect([
          'amqp://admin:admin@localhost:5672',
        ]);
      },
    },
  ],
  exports: ['AMQP_CONNECTION'],
})
export class RabbitMQModule {}
