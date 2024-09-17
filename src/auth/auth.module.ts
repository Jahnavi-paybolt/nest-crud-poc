import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "src/user/user.module";

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            secret: 'crud_jwt_secret_key',
            signOptions: {
                expiresIn: '1h'
            }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [JwtModule]
})
export class AuthModule {
    
}

