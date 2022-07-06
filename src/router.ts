import * as express from "express";
import testRoute from './controller/routes';

const router: express.Router = express.Router();

router.use("/test", testRoute);

export default router;
