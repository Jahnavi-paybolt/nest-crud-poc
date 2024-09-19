// we need to annotate it with @Controller

import { Controller, Body, Post, Res, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import {Response} from 'express';
import { CreateUserDto, UserDto } from "src/user/user.dto";


// 'auth' is a global prefix that is given to all the controllers
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    async signup(@Body() body: CreateUserDto, @Res() res: Response){
        const {user, access_token} = await this.authService.signup(body);

        res.status(HttpStatus.CREATED).json({
            message: "User created successfully",
            user
        })

    }

    @Post('signin')
    async signin(@Body() body: UserDto, @Res() res: Response){
        // const {email, password} = user;
        const {User, access_token} = await this.authService.login(body);

        res.cookie('Bearer', access_token, {
            httpOnly: true,
            // secure: true,
            maxAge: 3600000,
        });

        res.status(HttpStatus.OK).json({
            message: 'User logged in successfully',
            User,
        });
    }
}