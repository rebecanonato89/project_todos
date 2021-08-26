import { User } from '../typeorm/entities/User';
import { UsersRepository } from "../typeorm/repositories/UsersRepository";


const usersRepository = new UsersRepository();

interface IUser {
    user: User,
    street: string,
    number: number,
    district: string,
    city: string,
    state: string,
}

class RegAddrUsersSevice {
    public execute({ user, street, number, district, city, state }: IUser): User {

        const userAux = usersRepository.update({ user, street, number, district, city, state });
        return userAux;
    }
}

export default RegAddrUsersSevice;