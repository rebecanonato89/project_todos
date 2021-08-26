import { Request, Response, NextFunction } from "express";
import { ObjectShape, OptionalObjectSchema } from "yup/lib/object";

const checksUserValidator =
    (requestSchema: OptionalObjectSchema<ObjectShape>) =>
        async (request: Request, response: Response, next: NextFunction) => {
            const { name, email, birthDate, cpf } = request.body;

            try {
                await requestSchema.validate({
                    name, email, birthDate, cpf

                });
                next();
            } catch (error) {
                throw new Error(error);
            }
        }

export default checksUserValidator;