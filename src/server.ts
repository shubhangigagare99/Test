import * as express from "express";
import * as bodyParser from "body-parser";
import router from "./router";
import * as morgan from "morgan";
import { Database } from "./database";
import IConfig from './config/IConfig';
import * as cors from "cors";

export default class Server {
  private app: express.Express;
  constructor(private config: IConfig) {
    this.app = express();
  }

  public bootstrap = () => {
    this.app.use(
      morgan(":method :url :status :res[content-length] - :response-time ms")
    );
    this.initBodyParser();
    this.setupRoutes();
    return this.app;
  };

  public initBodyParser = () => {
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(cors("*"));
  };

  public setupRoutes = () => {
    this.app.use("/health-check", bodyParser.json(), (req, res) => {
      res.send("I am OK");
    });
    this.app.use("/api", router);
  };

  public run = () => {
    try {
      const { PORT, NODE_ENV, MONGO_URL } = this.config;

      Database.open(MONGO_URL).then(() => {
        this.app.listen(PORT, () => {
          console.log(`App Running ${PORT} on ${NODE_ENV} successfully..`);
        });
      }).catch((err) => {
        console.log('>>>>>>>>>>>>>>>>>>>', err);
      });
    } catch (error) {
      console.log('&&&&&&&&&&&&&', error);
    }
  };
}


