import { User } from '../typeorm/entities/User';
import { UsersRepository } from "../typeorm/repositories/UsersRepository";



interface Request {
    name: string,
    birthDate: Date,
    email: string,
    cpf: string,
    address?: {
        street: string,
        number: number,
        district: string,
        city: string,
        state: string,
    }
    todos?: Request[]
}

const usersRepository = new UsersRepository();
class CreateUsersService {
    public execute({ name, email, birthDate, cpf }: Request): User {

        const user = usersRepository.create({ name, email, birthDate, cpf });


        return user;
    }

}

export default CreateUsersService;