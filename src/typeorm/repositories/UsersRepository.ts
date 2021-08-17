import { User } from "../entities/User";
import fs from 'fs';

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

        fs.writeFile("db.json", JSON.stringify(this.users), function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("The file was saved!");
            }
        });

        return user;
    }

    search(cpf: string): User | undefined {

        let users: User[] = [];
        const data = fs.readFileSync('db.json',
            { encoding: 'utf8', flag: 'r' });


        users = JSON.parse(data);

        return users.find((user: any) => {
            return user.cpf == cpf
        });
    }

}


export { UsersRepository }