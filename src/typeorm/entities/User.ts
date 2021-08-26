import { v4 as uuidV4 } from "uuid";

class User {
    id?: string;
    name: string;
    birthDate?: Date;
    email?: string;
    cpf?: string;
    address?: {
        street: string,
        number: number,
        district: string,
        city: string,
        state: string,
    }
    todos?: [];

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { User }