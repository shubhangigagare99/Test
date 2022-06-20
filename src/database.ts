import * as mongoose from "mongoose";
import seedData from "./seedData";

export class Database {
  public static open = async (MONGO_URL : string) => {
    try {
      return new Promise<void>((resolve, reject) => {
        const options = {
          autoIndex: false,
          minPoolSize: 5,
        };
        mongoose.connect(MONGO_URL, options);
        mongoose.connection.on('connected', async () => {
          console.log('\nDatabase connect successfully');
          await seedData();
          resolve();
        });
        mongoose.connection.on('error', () => {
          console.log('Database is not connected :');
          reject();
        });
      });
    } catch (error) {
      console.log('CATCH BLOCK : database open =>', error);
    }
  }

  public static disconnect = async () => {
    try {
      await mongoose.disconnect();
    } catch (error) {
      console.log('CATCH BLOCK : database disconnect =>', error);
    }
  };
}
