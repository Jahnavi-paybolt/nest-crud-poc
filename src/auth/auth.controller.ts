// we need to annotate it with @Controller

import { Controller, Body, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";


// 'auth' is a global prefix that is given to all the controllers
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    signup(@Body() user){
        return this.authService.signup(user);
    }

    @Post('signin')
    signin(@Body() user){
        const {email, password} = user;
        return this.authService.login(email, password);
    }
}