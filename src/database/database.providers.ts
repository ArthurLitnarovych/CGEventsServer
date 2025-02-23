import { Sequelize } from 'sequelize-typescript';
import * as dotenv from 'dotenv';
import { Event } from 'src/events/models/event.model';

dotenv.config();

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: +process.env.DB_PORT || 5432,
        username: process.env.DB_USER || 'user',
        password: process.env.DB_PASSWORD || 'password',
        database: process.env.DB_NAME || 'dbname',
        models: [__dirname + '/**/*.model.ts'],
        logging: false,
      });
      sequelize.addModels([Event]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
