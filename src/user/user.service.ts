import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async create(data: Partial<User>): Promise<User> {
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

    async update(id: number, data: Partial<User>): Promise<User>{
        await this.userRepository.update(id, data);
        return this.findOne(id);
    }

    async delete(id: number): Promise<void>{
        await this.userRepository.delete(id)
    }
}