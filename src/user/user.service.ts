import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto, UserDto } from "./user.dto";

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async create(data: CreateUserDto): Promise<User> {
        const user = this.userRepository.create(data);
        return this.userRepository.save(user);
    }

    async findByEmail(email: string): Promise<User> {
        return this.userRepository.findOneBy({email})
    }

    async findOne(id: number): Promise<User>{
        return await this.userRepository.findOneBy({id})
    }

    async findAll(): Promise<User []>{
        return await this.userRepository.find()
    }

    async update(id: number, data: UserDto): Promise<User>{
        await this.userRepository.update(id, data);
        return this.findOne(id);
    }

    async delete(id: number){
        await this.userRepository.delete(id)
        return {
            message: "User has been deleted successfully"
        }
    }
}