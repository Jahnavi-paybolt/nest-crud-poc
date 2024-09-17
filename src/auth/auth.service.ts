import { ConflictException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";

@Injectable({})
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ){}

    async login(email: string, password: string){
        const user = await this.userService.findByEmail(email);
        
        if(user && user.password === password){
            const payLoad = {email: user.email, sub: user.id};

            return {
                message: "User logged in",
                User: user,
                access_token: this.jwtService.sign(payLoad)
            }
        }else {
            throw new Error('Invalid Credentials');
        }
    }

    async signup(body: any){

        const existingUser = await this.userService.findByEmail(body.email);

        if(existingUser){
            throw new ConflictException('User already exists, kindly login.')
        }

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