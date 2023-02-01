import { Module } from '@nestjs/common';
import { ListsModule } from './lists/lists.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ListModel } from './lists/entities/list.model';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { BullModule } from '@nestjs/bull';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ListsModule,
    EventEmitterModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      host: ':memory:',
      autoLoadModels: true,
      models: [ListModel],
    }),
    BullModule.forRoot({
      redis: {
        host: 'redis',
        port: 6379,
      },
    }),
    HealthModule,
  ],
  controllers: [],
})
export class AppModule {}
