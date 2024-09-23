import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NotFoundError } from "rxjs";
import { CreateUserDto, UserDto } from "src/user/user.dto";
import { UserService } from "src/user/user.service";
const bcrypt = require('bcrypt');

@Injectable({})
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ){}

    async login(body: UserDto){
        const user = await this.userService.findByEmail(body.email);
        
        if(!user){
            throw new NotFoundError("User does not exist")
        }

        const passwordCorrect = await bcrypt.compare(body.password, user.password);

        if(!passwordCorrect){
            throw new UnauthorizedException("Incorrect password")
        }

        const access_token = this.jwtService.sign(body);

        return {
            user,
            access_token
        }
    }

    async signup(body: CreateUserDto){

        const existingUser = await this.userService.findByEmail(body.email);

        if(existingUser){
            throw new ConflictException('User already exists, kindly login.')
        }

        const pass = await bcrypt.hash(body.password, 10);
        body.password = pass;
        const newUser = await this.userService.create(body);

        const payLoad = {email: newUser.email, sub: newUser.id};
        const accessToken = this.jwtService.sign(payLoad);

        return {
            message: "User registered successfully",
            user: newUser,
            access_token: accessToken
        }
    }
}