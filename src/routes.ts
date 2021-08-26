import { Router } from "express";
import UsersController from "./controllers/UsersController";
import checksExistsUser from './middlewares/checksExistsUser';
import checksUserValidator from './middlewares/checksUserValidator';


const routes = Router();
const userController = new UsersController();



routes.post("/userCreat", checksUserValidator, userController.create);

routes.get("/userFind", checksExistsUser, userController.search);
routes.get("/agefind", userController.agefind);
routes.get("/order", userController.order);
routes.post("/regAddr", checksExistsUser, userController.regAddr)
routes.post("/RegTodos", userController.RegTodos);

export { routes };