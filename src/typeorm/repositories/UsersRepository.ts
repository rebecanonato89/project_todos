import { User } from "../entities/User";
import fs from 'fs';

interface itodoDTO {
    id: string,
    title: string,
    deadline: string,
    done: boolean,
    created_at: any,
}

interface IUser {
    user: User,
    street: string,
    number: number,
    district: string,
    city: string,
    state: string,
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
        const data = fs.readFileSync('db.json',
            { encoding: 'utf8', flag: 'r' });

        this.users = JSON.parse(data);
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
        return this.users.find((user: any) => {
            return user.cpf == cpf
        });
    }

    findAll(): User[] {
        return this.users;
    }

    update({ user, street, number, district, city, state }: IUser): User {


        const index = this.users.findIndex(function (a) {
            return a.id === user.id;
        });

        if (index >= 0) {
            this.users.splice(index, 1);
        }

        user.address = {
            street,
            number,
            district,
            city,
            state
        };

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
}


export { UsersRepository }