import { User } from "../entities/User";

interface itodoDTO {
    id: string,
    title: string,
    deadline: string,
    done: boolean,
    created_at: any,
}

interface iuserDTO {
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
    todos?: itodoDTO[]
}

class UsersRepository {
    private users: User[];

    constructor() {
        this.users = [];
    }

    create({ name, email, birthDate, cpf }: iuserDTO): User {

        const user = new User();

        Object.assign(user, {
            name,
            email,
            birthDate: birthDate,
            cpf,
            todos: []
        });

        this.users.push(user);

        return user;
    }

    search(cpf: string): User | undefined {

        return this.users.find((user: any) => {
            return user.cpf == cpf
        });
    }


}


export { UsersRepository }