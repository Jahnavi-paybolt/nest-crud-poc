import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]), 
        // instead of doing this of forward referencing, we should avoid it completely
        // we can do this of avoiding the findByEmail method in the user.service(/.module) and put the logic directly in 
        // the auth.service(/.module) Doing this we can avoid the CIRCULAR DEPENDENCY
        forwardRef(() => AuthModule)
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}
