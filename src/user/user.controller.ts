import { Body, Request, Controller, Param, Post, Get, UnauthorizedException, Patch, Delete } from "@nestjs/common";
import { UserService } from "./user.service";
import {JwtService} from "@nestjs/jwt";
// import { AuthService } from "src/auth/auth.service";

//global prefix 'user'
@Controller('user')
export class UserController {
    constructor (
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        // private readonly authService: AuthService
    ){}


    // @Post('register')
    // async createUser(@Body() body){
    //     return this.authService.signup(body);
    // }

    // @Post('login')
    // async loginUser(@Body() body){
    //     const {email, password} = body;
    //     return this.authService.login(email, password);
    // }

    @Get(':id')
    async getUserById(@Param('id') id: number, @Request() req){
        const token = req.headers.authorization.split(' ')[1];
        if(!token){
            throw new UnauthorizedException('No token provided');
        }

        try {
            const payLoad = this.jwtService.verify(token);
            if(payLoad){
                return this.userService.findOne(id);
            }
        } catch(e){
            throw new UnauthorizedException('Invalid token');
        }
    }

    @Get()
    async GetAllUsers(@Request() req){
        const token = req.headers.authorization.split(' ')[1];
        if(!token){
            throw new UnauthorizedException('No token provided');
        }

        try {
            const payLoad = this.jwtService.verify(token);
            if(payLoad){
                return this.userService.findAll();
            }
        } catch(e){
            throw new UnauthorizedException('Invalid token');
        }

    }

    @Patch(':id')
    async updateUser(@Param('id') id: number, @Body() body, @Request() req){
        const token = req.headers.authorization.split(' ')[1];
        if(!token){
            throw new UnauthorizedException('No token provided');
        }

        try {
            const payLoad = this.jwtService.verify(token);
            if(payLoad){
                return this.userService.update(id, body);
            }
        } catch(e){
            throw new UnauthorizedException('Invalid token');
        }
    }


    @Delete(':id')
    async deleteUser(@Param('id') id: number, @Request() req){
        const token = req.headers.authorization.split(' ')[1];
        if(!token){
            throw new UnauthorizedException('No token provided');
        }

        try {
            const payLoad = this.jwtService.verify(token);
            if(payLoad){
                return this.userService.delete(id);
            }
        } catch(e){
            throw new UnauthorizedException('Invalid token');
        }
    }
}