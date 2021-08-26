import { Request, Response } from "express";
import { v4 as uuid } from "uuid";

import CreateUsersService from '../services/CreateUsersService';
import AgeFindUsersService from '../services/AgeFindUsersService';
import OrderUsersService from '../services/OrderUsersService';
import RegAddrUsersService from '../services/RegAddrUsersSevice';

interface itodo {
    id: string,
    title: string,
    deadline: string,
    done: boolean,
    created_at: any,
}

interface iuser {
    id: string,
    name: string,
    birthDate: Date,
    email: string,
    //password: string,
    cpf: number,
    address?: {
        street: string,
        number: number,
        district: string,
        city: string,
        state: string,
    }
    todos: itodo[]
}

const users: iuser[] = [];

export default class UsersController {

    public async create(request: Request, response: Response) {

        const { name, email, birthDate, cpf } = request.body;

        const createUsersService = new CreateUsersService();

        const user = createUsersService.execute({ name, email, birthDate, cpf });

        return response.status(201).json(user)
    }

    public async search(request: Request, response: Response) {
        const { user } = request.user;

        if (!user) {
            throw new Error('User not found!');
        }

        return response.status(200).json(user);

    }

    //Procurar Usuários Maiores de 18 \/
    public async agefind(request: Request, response: Response) {

        const ageFindUsersService = new AgeFindUsersService();
        const mage = ageFindUsersService.execute();


        return response.status(200).json(mage);
    }

    //Ordenar usuários em ordem Afabética \/
    public async order(request: Request, response: Response) {
        const { organize } = request.headers;

        const orderUsersService = new OrderUsersService();
        const users = orderUsersService.execute(String(organize));

        return response.status(200).json(users)

    }

    //Valida se o cpf está no banco de dados e registra um Endereço ao usuário \/
    public async regAddr(request: Request, response: Response) {
        const { user } = request.user;
        const { street, number, district, city, state } = request.body;

        const regAddrUsersService = new RegAddrUsersService();
        const userAux = regAddrUsersService.execute({ user, street, number, district, city, state });

        return response.status(200).json(userAux);
    }

    public async RegTodos(request: Request, response: Response) {

        const { cpf } = request.headers;

        if (cpf) {
            const fuser = users.find((user: any) => {
                return user.cpf === cpf
            });

            if (!fuser) {
                return response.status(404).json({ message: "Usuario não existe" });
            }

            const { title, deadline } = request.body;

            const todo = {
                id: uuid(),
                title,
                deadline,
                done: false,
                created_at: new Date()
            }

            fuser.todos.push(todo);

            return response.status(200).json(fuser)
        }
        return response.status(404).json({ message: "Cpf não preechido" });

    }
}

