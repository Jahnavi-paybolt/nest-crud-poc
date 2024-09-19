import { Body, Request, Controller, Param, Post, Get, UnauthorizedException, Patch, Delete, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "src/guards/auth.guard";
// import { AuthService } from "src/auth/auth.service";

//global prefix 'user'
// @UseGuards(AuthGuard)
@Controller('users')
export class UserController {
    constructor (
        private readonly userService: UserService,
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

    @Get()
    async GetAllUsers(){
        return this.userService.findAll();

    }

    @UseGuards(AuthGuard)
    @Get(":id")
    async getUserById(@Param("id") id: number) {
        return this.userService.findOne(id)
    }

    
    @UseGuards(AuthGuard)
    @Patch(':id')
    async updateUser(@Param('id') id: number, @Body() body){
        return this.userService.update(id, body);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async deleteUser(@Param('id') id: number, @Request() req){
        return this.userService.delete(id);
    }
}