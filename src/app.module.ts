import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

// AppModule is annotated with the @Module decorator
// Decorator is a function that adds metadata to the current class or a function, adds more properties to class
// Module can import more modules
// any module can import providers, controllers
@Module({
  imports: [
    AuthModule, 
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'new',
      database: 'crud-nest',
      entities: [User],
      synchronize: true
    }),
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
