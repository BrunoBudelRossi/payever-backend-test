import { Module } from '@nestjs/common';
import AmqpConnection from 'amqp-connection-manager';
import { EnvsConfig } from 'src/infrastructure/config/env';

@Module({
  providers: [
    {
      provide: 'AMQP_CONNECTION',
      useFactory: async () => {
        return await AmqpConnection.connect([EnvsConfig.getRabbitmqUrl()]);
      },
    },
  ],
  exports: ['AMQP_CONNECTION'],
})
export class RabbitMQModule {}
