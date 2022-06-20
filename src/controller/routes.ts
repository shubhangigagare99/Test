import { Router } from "express";
import test from "./userController";

const testRoute: Router = Router();

testRoute
.get("/", test.get)
 .post("/", test.create)
.delete("/",  test.delete)

export default testRoute;
