import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';
import { KnexModule } from 'nestjs-knex';
import knexConfig from '../knexfile';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // Автоматическая генерация схемы
      playground: true, // Включение GraphQL Playground
    }),
    KnexModule.forRoot({
      config: knexConfig[process.env.NODE_ENV || 'development'],
    }),
    UsersModule,
    SharedModule,
  ],
})
export class AppModule {}