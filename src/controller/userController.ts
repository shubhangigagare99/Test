import { NextFunction, Request, Response } from "express";
import userRepo from '../user/userRepo'
class Controller {

  async get(request: Request, response: Response, next: NextFunction) {
    try {
      const options = request.query;
      const userData = await userRepo.getAll(options);
      response.status(200).send({
        message: `successfully fetched users`,
        data: userData,
      });
    } catch (error) {
      console.log("CATCH BLOCK : user controller listUsers =>", error);
    }
  }

  async create(req: Request, responce: Response, next: NextFunction) {
    console.log('Inside post request for user', req.body);
    const { name } = req.body;
    userRepo.create({ name })
    responce.status(200).send({ message: 'User Created Successfully', data: { name }, status: 'success' });
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    console.log("Inside delete request for user", req.params);
    const { originalId } = req.body;
    await userRepo.Delete(originalId);
    if (!originalId) {
      return next({
        error: "Bad Request",
        message: "Id is requird",
        status: 400,
      });
    }
    res.status(200).send({
      message: "user Deleted successfully",
      data: { originalId },
      status: "success",
    });
  }
}
export default new Controller();
